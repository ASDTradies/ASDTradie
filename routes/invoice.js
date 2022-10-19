let express = require('express');
let router = express.Router();
let uniqid = require('uniqid');
const bcrypt = require('bcryptjs'); //Bcrypt - for lightweight hashing
const Invoice = require('../models/invoice-model').Invoice;

// router.get('/invoiceGen', async (req, res)=> {
//     let invoice = Invoice.findOne({first_name: res.newInvoice.first_name});
//     res.render('invoiceGen.ejs', invoice);
// })

router.get('/billingForm', (req, res)=> {
    res.render('billingForm.ejs')
})

//router.get('/index', (req, res)=> {
//    res.render('index.html')
//})

/*router.get('/orderHistory', (req, res)=> {
    Invoice.find({}).then((invoice) =>{
        res.send(invoice);
        res.render('orderHistory.ejs')
    }).catch((error) => {
        res.status(500).send(error);
    })
})
*/

/*const invoiceSchema = {
    //   invId: String,
    //   invRequestID: String,
       service_title: String,
       userID: String,
       tradieID: String,
       street_address: String,
       date: String,
       price: String,
         //first_name: String,
       street_address: String
   }

   const Invoice = mongoose.model('Invoice', invoiceSchema);
   */

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
    bcrypt.genSalt(10, function(err, salt){ //Hashing the password before storage
        bcrypt.hash(newInvoice.userID, salt, (err,hash) => {
            if(err) throw err;
            newInvoice.userID = hash;
        })
    })
    bcrypt.genSalt(10, function(err, salt){ //Hashing the password before storage
        bcrypt.hash(newInvoice.first_name, salt, (err,hash) => {
            if(err) throw err;
            newInvoice.first_name = hash;
        })
    })
    bcrypt.genSalt(10, function(err, salt){ //Hashing the password before storage
        bcrypt.hash(newInvoice.service_requestID, salt, (err,hash) => {
            if(err) throw err;
            newInvoice.service_requestID = hash;
        })
    })
    bcrypt.genSalt(10, function(err, salt){ //Hashing the password before storage
        bcrypt.hash(newInvoice.service_title, salt, (err,hash) => {
            if(err) throw err;
            newInvoice.service_title = hash;
        })
    })
    bcrypt.genSalt(10, function(err, salt){ //Hashing the password before storage
        bcrypt.hash(newInvoice.last_name, salt, (err,hash) => {
            if(err) throw err;
            newInvoice.last_name = hash;
        })
    })
    bcrypt.genSalt(10, function(err, salt){ //Hashing the password before storage
        bcrypt.hash(newInvoice.tradieID, salt, (err,hash) => {
            if(err) throw err;
            newInvoice.tradieID = hash;
        })
    })
    bcrypt.genSalt(10, function(err, salt){ //Hashing the password before storage
        bcrypt.hash(newInvoice.hours, salt, (err,hash) => {
            if(err) throw err;
            newInvoice.hours = hash;
        })
    })
    bcrypt.genSalt(10, function(err, salt){ //Hashing the password before storage
        bcrypt.hash(newInvoice.street_address, salt, (err,hash) => {
            if(err) throw err;
            newInvoice.street_address = hash;
        })
    })
    bcrypt.genSalt(10, function(err, salt){ //Hashing the password before storage
        bcrypt.hash(newInvoice.date, salt, (err,hash) => {
            if(err) throw err;
            newInvoice.date = hash;
        })
    })
    bcrypt.genSalt(10, function(err, salt){ //Hashing the password before storage
        bcrypt.hash(newInvoice.phone_number, salt, (err,hash) => {
            if(err) throw err;
            newInvoice.phone_number = hash;
        })
    })
    bcrypt.genSalt(10, function(err, salt){ //Hashing the password before storage
        bcrypt.hash(newInvoice.city, salt, (err,hash) => {
            if(err) throw err;
            newInvoice.city = hash;
        })
    })
    bcrypt.genSalt(10, function(err, salt){ //Hashing the password before storage
        bcrypt.hash(newInvoice.state, salt, (err,hash) => {
            if(err) throw err;
            newInvoice.state = hash;
        })
    })
    bcrypt.genSalt(10, function(err, salt){ //Hashing the password before storage
        bcrypt.hash(newInvoice.post_code, salt, (err,hash) => {
            if(err) throw err;
            newInvoice.post_code = hash;
        })
    })
    bcrypt.genSalt(10, function(err, salt){ //Hashing the password before storage
        bcrypt.hash(newInvoice.price, salt, (err,hash) => {
            if(err) throw err;
            newInvoice.price = hash;
        })
    })
    newInvoice.save()
    .then(newInvoice =>{
// console.log("newinvoice" + newInvoice)
    res.render('invoiceGen.ejs', {invoice: newInvoice});
})
.catch(err => console.log(err))
})





module.exports = router;


