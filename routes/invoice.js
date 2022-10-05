let express = require('express');
let router = express.Router();
let uniqid = require('uniqid');
const Invoice = require('../models/invoice-model').Invoice;

// router.get('/invoiceGen', async (req, res)=> {
//     let invoice = Invoice.findOne({first_name: res.newInvoice.first_name});
//     res.render('invoiceGen.ejs', invoice);
// })

router.get('/billingForm', (req, res)=> {
    res.render('billingForm.ejs')
})

router.post('/billingForm',  async (req, res) =>{
    //const { invRequestID, invServiceID, invCustomerID, invTradieID, invAddress, invDate, invPrice, invPaid} = req.body;
    const { service_title , userID , tradieID , street_address , price} = req.body;
    const newInvoice = new Invoice({
        //invRequestID,
        service_title, 
        userID, 
        tradieID, 
        street_address,
        date: new Date(), 
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





   // var errors = []; //Error messages

    //Check required fields
  //  if(!first_name || !last_name || !street_address || !city || !postcode || !state || !phone_number){
   //    errors.push({msg: 'Please fill in all fields'});
   // }
  //  else{

