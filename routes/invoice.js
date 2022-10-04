let express = require('express');
let router = express.Router();
let uniqid = require('uniqid');
const Invoice = require('../models/invoice-model').Invoice;

router.get('/billingForm', (req, res)=> {
    res.render('billingForm.ejs')
})

router.get('/invoiceGen', (req, res)=> {
    res.render('invoiceGen.ejs')
})


router.post('/billingForm',  (req, res) =>{
    //const { invRequestID, invServiceID, invCustomerID, invTradieID, invAddress, invDate, invPrice, invPaid} = req.body;
    const { first_name, street_address} = req.body;
    const newInvoice = new Invoice({
        //invRequestID,
        //invServiceID, 
        first_name, 
        //invTradieID, 
        street_address
        //invDate, 
        //invPrice, 
        //invPaid
    });
// }
    newInvoice.save()
    res.redirect('/billingForm.ejs');
})

module.exports = router;





   // var errors = []; //Error messages

    //Check required fields
  //  if(!first_name || !last_name || !street_address || !city || !postcode || !state || !phone_number){
   //    errors.push({msg: 'Please fill in all fields'});
   // }
  //  else{

