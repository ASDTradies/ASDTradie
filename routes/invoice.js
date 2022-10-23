//[REQUIRED CONNECTIONS AND FUNCTIONS FOR DATA ACCESS AND USER AUTHETICATION]
let express = require('express');
let router = express.Router();
let uniqid = require('uniqid');
const Invoice = require('../models/invoice-model').Invoice;
let ServiceRequest = require('../models/serviceRequests-model').ServiceRequest;
let Service = require('../models/services-model').Service;
const { forwardAuthenticated, ensureAuthenticated } = require('../config/auth');

//Render the billingForm.ejs page where user will input data. 
//Make sure to grab the first available service request from current user.
router.get('/billingForm', ensureAuthenticated, (req, res)=> {
    var errors = [];
    ServiceRequest.findOne({customerID : req.session.userID}).then(async serviceRequest => { 
        if(serviceRequest){
            res.render('billingForm.ejs', {serviceRequest});
        }
        else{
            errors.push({msg: 'No active Service Request found'});
            req.flash('error', errors[0].msg)
            res.render('billingForm.ejs');
        }
    })
    .catch(err => console.log(err))
})

//When User submits the billingForm: Check all data if input is valid and correct, then CREATE INVOICE document from the input
//Store the document within the Invoice MongoDB collection, then render invoiceGen.ejs page where the customer can see there invoice.
router.post('/billingForm',  ensureAuthenticated, async (req, res) =>{
    const { service_requestID, service_title , userID , first_name , last_name , tradieID , hours , street_address , phone_number, city, state, post_code, price, cardNumber, cardName, expiry, verification } = req.body;
    //Error messages
    var errors = [];
    //Check all required fields if they are empty
    if(!first_name || !last_name || !street_address || !phone_number || !city || !state || !post_code|| !cardNumber|| !cardName || !expiry || !verification){
        errors.push({msg: 'Please fill in all "Non Optional" fields'});
    }
    //Check all numeric inputfields if they are correct size and house a valid "Int" value.
    if(parseInt(phone_number).length != 10){
        errors.push({msg: 'Please fill "Phone Number" to correct length and type'});
    }
    if(parseInt(post_code).length != 4){
        errors.push({msg: 'Please fill "Postcode" to correct length and type'});
    }
    if(parseInt(expiry).length != 4){
        errors.push({msg: 'Please fill "Card Expiry Date" to correct length and type'});
    }
    if(parseInt(cardNumber).length != 16){
        errors.push({msg: 'Please "Card Numbers" to correct length and type'});
    }
    if(parseInt(verification).length != 3){
        errors.push({msg: 'Please fill "Verification Numbers" to correct length and type'});
    }
    if(errors.length > 0){    //If there is an error, render the error messages
        req.flash('error', errors[0].msg)
        res.redirect('/invoice/billingForm')
    }
    //CREATE INVOICE
    else{
    const newInvoice = new Invoice({
        service_requestID,
        service_title, 
        userID, 
        first_name,
        last_name,
        tradieID, 
        hours,
        street_address,
        date: new Date(), 
        phone_number,
        city,
        state, 
        post_code,
        price 
    });
    //Save INVOICE and RENDER invoice.Gen.ejs Page
    await newInvoice.save()
    .then(newInvoice =>{
        res.render('invoiceGen.ejs', {invoice: newInvoice});
    })
    .catch(err => console.log(err))
    }
})

//Render the orderHistory.ejs page which shows all invoices produced for the current Customer
router.get('/orderHistory', ensureAuthenticated, (req, res)=> {
    Invoice.find({userID: req.session.userID}, function(err, invoices){
        console.log("Result:", invoices)
        res.render('orderHistory', {
            invoiceList: invoices
        })
    })
    .catch(err => console.log(err))
})

//When a Customer submits search query, search the Invoice collection for any values matching QUERY
router.post('/orderHistory', ensureAuthenticated, (req, res)=> {
    const {query} = req.body;
    var errors = [];
    Invoice.find(
    {$and:[{userID: req.session.userID},
    {$or:[{street_address: query.toString()}, 
        {service_title: query.toString()}, 
        {tradieID: query.toString()}, 
        {date: query.toString()}, 
        {price: query.toString()}
    ]}
    ]}, function(err, invoices){
        console.log("Query:", query);
        console.log("Result:", invoices);
        res.render('orderHistory', {
            invoiceList: invoices
        });
    })
})

//Render the workHistory.ejs page which shows all invoices produced for the current Tradie
router.get('/workHistory', ensureAuthenticated, (req, res)=> {
    Invoice.find({tradieID: req.session.userID+'/'}, function(err, invoices){
        res.render('workHistory', {
            invoiceList: invoices
        })
    })
})

//When a Tradie submits search query, search the Invoice collection for any values matching QUERY
router.post('/workHistory', ensureAuthenticated, (req, res)=> {
    const {query} = req.body;
    var errors = [];
    Invoice.find(
    {$and:[{tradieID: req.session.userID},
    {$or:[{street_address: query.toString()}, 
        {service_title: query.toString()}, 
        {userID: query.toString()}, 
        {date: query.toString()}, 
        {price: query.toString()}
    ]}
    ]}, function(err, invoices){
        console.log("Query:", query);
        console.log("Result:", invoices);
        res.render('workHistory', {
            invoiceList: invoices
        });
    })
})

module.exports = router;


