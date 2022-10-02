const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth'); //This stops users from accessing this if they're not logged in

router.get('/', ensureAuthenticated, (req, res) => {
    res.render('customerDashboard.ejs', {
        name: req.user.first_name
    })
});

module.exports = router;