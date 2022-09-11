let express = require('express');
let router = express.Router();
let User = require('../models/users-model').User;
let uniqid = require('uniqid');

router.post('/' , async (req, res) =>{
    let reqBody = req.body;
    let newUser = new User({
        id: uniqid(),
        first_name: reqBody.first_name,
        last_name: reqBody.last_name,
        email: reqBody.email,
        password: reqBody.password
    });
    await newUser.save();
    res.send(newUser);
})

module.exports = router;