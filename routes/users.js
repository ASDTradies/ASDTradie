const express = require('express');
const router = express.Router();
const User = require('../models/users-model').User;
const bcrypt = require('bcryptjs'); //Bcrypt - for lightweight hashing
const passport = require('passport');
const { forwardAuthenticated, ensureAuthenticated } = require('../config/auth');

//GETs - renders all pages
router.get('/login', forwardAuthenticated, (req, res)=> {
    res.render('login')
})

router.get('/registerUser', (req, res)=> {
    res.render('registerUser.ejs')
})

router.get('/settings', ensureAuthenticated, (req, res)=> {
    res.render('userSettings.ejs', {
        user: req.user
    })
})

//Checks if app should render tradiedashboard or customerdashboard
router.get('/redirectLogin', (req, res)=> {
    if(req.user.profileType == 'T'){
        res.redirect('http://localhost:3000/tradieDashboard.html');
    } else{
        res.redirect('http://localhost:3000/customerDashboard.html');
    }
})

router.get('/logout', ensureAuthenticated, (req, res, next) => {
    req.logout(function(err) {
      if (err) { return next(err); }
    req.flash('success_msg', 'You are logged out');
    res.redirect('http://localhost:3000/');
    });
});

//POSTs - sends forms to MongoDB
router.post('/registerUser',  (req, res) =>{
    const { first_name, last_name, email, password, password2, profileChar} = req.body;
    var profileType = profileChar === 'on' ? 'T' : 'C'; //If the checkbox is ticked, user can be a Tradie
    var errors = []; //Error messages

    //Check required fields
    if(!first_name || !last_name || !email || !password || !password2){
        errors.push({msg: 'Please fill in all fields'});
    }

    //Passwords do not match
    if(password !== password2){
        errors.push({msg: 'Passwords do not match'});
    }

    if(errors.length > 0){    //If there is an error, render the error messages
        res.render('registerUser', {
            errors,
            first_name,
            last_name,
            email,
            password,
            password2
        })
    } else { //Otherwise, find the user using email
        User.findOne({email: email}).then(user => {
            if(user) { //User not null, already exists in the db
                errors.push({msg: 'This email is already in use!'})
                res.render('registerUser', {
                    errors,
                    first_name,
                    last_name,
                    email,
                    password,
                    password2
                })
            } else {
                const newUser = new User({ //Make a new user object to save
                    first_name,
                    last_name,
                    email,
                    password,
                    profileType
                });
                bcrypt.genSalt(10, function(err, salt){ //Hashing the password before storage
                    bcrypt.hash(newUser.password, salt, (err,hash) => {
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save()
                        .then(user => {
                            req.flash('success_msg', 'Registration successful! Please enter your credentials to log in.')
                            res.redirect('/users/login')
                        })
                        .catch(err => console.log(err));
                    })
                })
            }
        })
    }


})

router.post('/login' , (req, res, next) =>{
    passport.authenticate('local', {
        successRedirect: '/users/redirectLogin', 
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

router.post('/change-details', (req, res) => {
    const { first_name, last_name, email, phone, dob, bio} = req.body;
    Object.keys(req.body).forEach(function(key){
        console.log(key + " " + req.body[key])
    })
    
});
module.exports = router;