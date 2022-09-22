module.exports = {
    ensureAuthenticated: function(req, res, next){ //Another passport feature, checks if user is logged in/authenticated
        if(req.isAuthenticated()){
            return next();
        }
        req.flash('error_msg', 'Please log in to view this page.');
        res.redirect('/users/login');
    }
}