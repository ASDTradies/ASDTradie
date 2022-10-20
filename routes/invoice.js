let express = require('express');
let router = express.Router();
let uniqid = require('uniqid');
const Invoice = require('../models/invoice-model').Invoice;
let ServiceRequest = require('../models/serviceRequests-model').ServiceRequest;
let Service = require('../models/services-model').Service;
const { forwardAuthenticated, ensureAuthenticated } = require('../config/auth');


// router.get('/invoiceGen', async (req, res)=> {
//     let invoice = Invoice.findOne({first_name: res.newInvoice.first_name});
//     res.render('invoiceGen.ejs', invoice);
// })

router.get('/billingForm', ensureAuthenticated, (req, res)=> {
//Get serviceRequest where service request customer id = current session id
    ServiceRequest.findOne({customerID : req.session.userID}).then(serviceRequest => { 
        if(serviceRequest){
            console.log(serviceRequest.customerID)
            console.log(serviceRequest.tradieID)
            let service_request = serviceRequest({
                id: serviceRequest.id,
                serviceId: serviceRequest.serviceId,
                stage: serviceRequest.stage,
                date: serviceRequest.date,
                tradieID: serviceRequest.tradieID,
                customerID: serviceRequest.userID
            });
            res.render('billingForm.ejs', service_request);
        }
    })
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

router.get('/orderHistory', ensureAuthenticated, (req, res)=> {
    Invoice.find({}, function(err, invoices){
        res.render('orderHistory', {
            invoiceList: invoices
        })
    })  
})

router.get('/workHistory', ensureAuthenticated, (req, res)=> {
    Invoice.find({}, function(err, invoices){
        res.render('workHistory', {
            invoiceList: invoices
        })
    })
        

})


router.post('/billingForm',  ensureAuthenticated, async (req, res) =>{
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
    await newInvoice.save()
    .then(newInvoice =>{
        // console.log("newinvoice" + newInvoice)
        res.render('invoiceGen.ejs', {invoice: newInvoice});
    })
    .catch(err => console.log(err))
})





module.exports = router;


