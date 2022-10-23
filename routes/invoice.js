let express = require('express');
let router = express.Router();
let uniqid = require('uniqid');
const Invoice = require('../models/invoice-model').Invoice;
let ServiceRequest = require('../models/serviceRequests-model').ServiceRequest;
let Service = require('../models/services-model').Service;
const { forwardAuthenticated, ensureAuthenticated } = require('../config/auth');


router.get('/billingForm', ensureAuthenticated, (req, res)=> {
//Get serviceRequest where service request customer id = current session id
    
    ServiceRequest.findOne({customerID : req.session.userID}).then(async serviceRequest => { 
        //let service = await Service.findOne({id: ServiceRequest.serviceID});
        //console.log(serviceRequest.service.serviceTitle)
        //console.log(serviceRequest)
        if(serviceRequest){
            
            res.render('billingForm.ejs', {serviceRequest/*, serviceTitle: service.serviceTitle*/});
        }
        
    })
    .catch(err => console.log(err))
})


router.get('/orderHistory', ensureAuthenticated, (req, res)=> {
    Invoice.find({userID: req.session.userID}, function(err, invoices){
        console.log("Result:", invoices)
        res.render('orderHistory', {
            invoiceList: invoices
        })
    })
    .catch(err => console.log(err))
})

router.post('/orderHistory', ensureAuthenticated, (req, res)=> {
    const {query} = req.body;
    var errors = [];
    Invoice.find(
    {$and:[{userID: req.session.userID},
    {$or:[{street_address: query.toString()}, 
        {_id: query.toString()},
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


router.get('/workHistory', ensureAuthenticated, (req, res)=> {
    Invoice.find({tradieID: req.session.userID+'/'}, function(err, invoices){
        res.render('workHistory', {
            invoiceList: invoices
        })
    })
})


router.post('/billingForm',  ensureAuthenticated, async (req, res) =>{
    //const { invRequestID, invServiceID, invCustomerID, invTradieID, invAddress, invDate, invPrice, invPaid} = req.body;
    const { service_requestID, service_title , userID , first_name , last_name , tradieID , hours , street_address , phone_number, city, state, post_code, price, cardNumber, cardName, expiry, verification } = req.body;
    var errors = []; //Error messages
    //Check required fields
    if(!first_name || !last_name || !street_address || !phone_number || !city || !state || !post_code|| !cardNumber|| !cardName || !expiry || !verification){
        errors.push({msg: 'Please fill in all "Non Optional" fields'});
    }
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

    
    await newInvoice.save()
    .then(newInvoice =>{
        res.render('invoiceGen.ejs', {invoice: newInvoice});
    })

    .catch(err => console.log(err))
    }
})





module.exports = router;


