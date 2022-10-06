let express = require('express');
let router = express.Router();
let uniqid = require('uniqid');
const Invoice = require('../models/invoice-model').Invoice;

router.get('/orderHistory', (req, res)=> {
    res.render('orderHistory.ejs')
})








module.exports = router;