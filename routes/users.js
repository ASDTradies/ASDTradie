const express = require('express');
const router = express.Router();
const User = require('../models/users-model').User;
const bcrypt = require('bcryptjs'); //Bcrypt - for lightweight hashing
const passport = require('passport');
const { forwardAuthenticated, ensureAuthenticated } = require('../config/auth'); //Comes from auth.js - determines if user is allowed to access pages

//GETs - mostly loads all pages along with data passed on from POSTs
router.get('/login', forwardAuthenticated, (req, res)=> {
    res.render('login')
})

router.get('/registerUser', (req, res)=> {
    res.render('registerUser.ejs')
})

router.get('/settings', ensureAuthenticated, (req, res)=> {
    if(req.user.profileType == 'T'){
        res.render('userTSettings.ejs', {
            user: req.user
        })    } else {
        res.render('userSettings.ejs', {
            user: req.user
        })
    }
})

//Checks if app should render tradiedashboard or customerdashboard
router.get('/redirectLogin', (req, res)=> {
    req.session.userID = req.user._id;
    if(req.user.profileType == 'T'){
        res.redirect('http://localhost:3000/tradieDashboard.html');
    } else{
        res.redirect('http://localhost:3000/customerDashboard.html');
        
    }
})

router.get('/logout', ensureAuthenticated, (req, res, next) => { //Destroys req.user
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

router.post('/login' , (req, res, next) =>{ //This handles user login redirects
    passport.authenticate('local', {
        successRedirect: '/users/redirectLogin', 
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
})

router.post('/change-details', (req, res) => {
    var form = req.body;
    Object.keys(form).forEach(k => (!form[k] && form[k] !== undefined) && delete form[k]); //Deletes the keys that have no values attached
    User.updateOne(req.user, form, function(err, res){
        if(err) throw err;
        console.log("document updated")
        req.flash('success_msg', 'Details successfully changed!')
    });  
    res.redirect('/users/settings')
});

router.post('/change-password', (req, res) => {
    const { current_password, new_password, new_password2} = req.body;
    console.log(req.body)
    var errors = [];
    bcrypt.compare(current_password, req.user.password, (err, isMatch) => {
        if(err) throw err

        if(new_password !== new_password2){
            errors.push({msg: 'Passwords do not match'});
        }

        if(errors.length > 0){    //If there is an error, render the error messages
            req.flash('error', 'Passwords do not match')
            res.redirect('/users/settings')
        } else if (isMatch) {
                bcrypt.genSalt(10, function(err, salt){ //Hashing the password before storage
                    bcrypt.hash(new_password, salt, (err,hash) => {
                        req.user.password = hash; //rehashes the password again for security
                        req.user.save(); //saves into database
                        req.flash('success_msg', 'Password successfully changed!')
                        res.redirect('/users/settings')
                    })
                })
        } else {
            req.flash('error', 'Wrong password!')
            res.redirect('/users/settings')
        }
    })
})

module.exports = router;