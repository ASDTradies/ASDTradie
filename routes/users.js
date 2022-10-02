const express = require('express');
const router = express.Router();
const User = require('../models/users-model').User;
const bcrypt = require('bcryptjs'); //Bcrypt - for lightweight hashing
const passport = require('passport');

//GETs - renders all pages
router.get('/login', (req, res)=> {
    res.render('login.ejs')
})

router.get('/registerUser', (req, res)=> {
    res.render('registerUser.ejs')
})

//Checks if app should render tradiedashboard or customerdashboard
router.get('/redirectLogin', (req, res)=> {
    if(req.user.profileType == 'T'){
        res.render('tradieDashboard.ejs', {
            user: req.user
        });
    } else{
        res.render('customerDashboard.ejs', {
            user: req.user
        })
    }
})

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
                errors.push({msg: 'Email is already in use!'})
                res.render('registerUser', {
                    errors,
                    first_name,
                    last_name,
                    email,
                    password,
                    password2
                })
            } else {
                const newUser = new User({
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
                            req.flash('success_msg', 'Registration successful!')
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

router.get('/logout', (req, res) =>{
    req.logout(); //Passport method, easily logs out user.
    req.flash('success_msg', 'You are logged out');
    res.redirect('users/login');
})

module.exports = router;