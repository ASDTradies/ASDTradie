const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs'); //Bcrypt - for lightweight hashing
const User = require('../models/users-model').User;

module.exports = function(passport) {
    passport.use(new LocalStrategy(
      { usernameField: 'email' }, 
      (email, password, done) => {
        User.findOne({email: email})
        .then(user => { //Find user with email
          if (!user) {
            return done(null, false, { message: 'That email is not registered' }); //Should be changed to just 'Invalid email or password', higher security
          }
  
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
              return done(null, user); //User found
            } else {
              return done(null, false, { message: 'Password incorrect' }); //Should be changed to just 'Invalid email or password', higher security
            }
          });
        });
      })
    );
  
    //Passport methods - attach the authenticated user to req.session.passport.user
    passport.serializeUser(function(user, done) {
      done(null, user);
    });
  
    passport.deserializeUser(function(id, done) { //takes last object attached to req.session.passport.user and attaches to req.user
      User.findById(id, function(err, user) {
        done(err, user);
      });
    });
  };