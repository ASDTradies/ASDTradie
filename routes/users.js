const express = require('express');
const router = express.Router();
const User = require('../models/users-model').User;
const bcrypt = require('bcryptjs'); //Bcrypt - for lightweight hashing
const passport = require('passport');

//GETs
router.get('/login', (req, res)=> {
    res.render('login.ejs')
})

router.get('/registerUser', (req, res)=> {
    res.render('registerUser.ejs')
})

//Posts
router.post('/registerUser',  (req, res) =>{
    const { first_name, last_name, email, password, password2, profileChar} = req.body;
    console.log(profileChar)
    var profileType = 'C';
    if(profileChar === 'on'){
        profileType = 'T';
    }

    let errors = [];

    //Check required fields
    if(!first_name || !last_name || !email || !password || !password2){
        errors.push({msg: 'Please fill in all fields'});
    }

    //Passwords do not match
    if(password !== password2){
        errors.push({msg: 'Passwords do not match'});
    }

    if(errors.length > 0){
        res.render('registerUser', {
            errors,
            first_name,
            last_name,
            email,
            password,
            password2
        })
    } else {
        //Passwords confirmed
        User.findOne({email: email})
        .then(user => {
            if(user) { //User already exists in the db
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
                bcrypt.genSalt(10, function(err, salt){
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
        successRedirect: '/customerDashboard/',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

router.get('/logout', (req, res) =>{
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('users/login');

})

module.exports = router;