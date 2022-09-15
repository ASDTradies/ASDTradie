let express = require('express');
let router = express.Router();
let uniqid = require('uniqid');
let Invoice = require('../models/invoice-model').Invoice;

router.post('/' , async (req, res) =>{
    //console.log(req.body);
     let newInvoice = new Invoice({
         invoiceId: uniqid(),
         requestId: req.body.requestId,
         date: new Date(),
         price: req.body.price
     });
     await newInvoice.save();
     res.send('Invoice requested');
 })
 
 router.get('/', async(req,res) =>{
     let invoice = await invoice.find();
     res.send(invoice);
 })
 
 router.put('/:invoiceId' , async (req,res) =>{
     let invoiceId = req.params.invoiceId;
     await invoice.updateOne({invoiceId: invoiceId} , req.body);
     res.send('Invoice request approved/rejected');
 })

 module.exports = router;