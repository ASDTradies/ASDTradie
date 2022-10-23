module.exports = {
    ensureAuthenticated: function(req, res, next){ //Another passport feature, checks if user is logged in/authenticated
        if(req.isAuthenticated()){  //If the user is authenticated, continue
            return next();
        }
        req.flash('error_msg', 'Please log in to view this page.'); //Else, show error message
        res.redirect('/users/login');
    },
    forwardAuthenticated: function(req, res, next) {
        if (!req.isAuthenticated()) { //If user is not authenticated, continue
          return next();
        }
    }
}