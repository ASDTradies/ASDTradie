let express = require('express');
let router = express.Router();
let uniqid = require('uniqid');
const crypto = require('crypto'); 
let salt = 'f844b09ff50c'
const Invoice = require('../models/invoice-model').Invoice;

router.get('/billingForm', (req, res)=> {
    res.render('billingForm.ejs')
})

router.get('/orderHistory', (req, res)=> {
    //var query = {userID: "112"};
    Invoice.find({}, function(err, invoices){
        res.render('orderHistory', {
            invoiceList: invoices
        })
    })
})

router.get('/workHistory', (req, res)=> {
    Invoice.find({}, function(err, invoices){
        res.render('workHistory', {
            invoiceList: invoices
        })  
    })
})

router.post('search', async (req, res)=>{
    var query = "searchQuery";
    Invoice.find({query}, function(err, invoices){
        res.render('orderHistory',{
            invoiceList: invoices
        })
    })
})

router.post('/billingForm',  async (req, res) =>{
    //const { invRequestID, invServiceID, invCustomerID, invTradieID, invAddress, invDate, invPrice, invPaid} = req.body;
    const { service_requestID, service_title , userID , first_name , last_name , tradieID , hours , street_address , phone_number, city, state, post_code, price} = req.body;
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
        //invPaid
    });
    Object.values(newInvoice).forEach(val =>{
        let hash = crypto.pbkdf2Sync(newInvoice.val, salt, 1000, 64, 'sha512').toString('hex');
        newInvoice.val = hash;
    });

    newInvoice.save()
    .then(newInvoice =>{
// console.log("newinvoice" + newInvoice)
    res.render('invoiceGen.ejs', {invoice: newInvoice});
})
.catch(err => console.log(err))
})





module.exports = router;


