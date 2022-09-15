let express = require('express');
let router = express.Router();
let uniqid = require('uniqid');
let Invoice = require('../models/invoice-model').Invoice;

router.post('/' , async (req, res) =>{
    //console.log(req.body);
     let newInvoice = new Invoice({
         id: uniqid(),
         serviceId: req.body.serviceId,
         stage: req.body.stage,
         date: new Date()
     });
     await newInvoice.save();
     res.send('Service requested');
 })
 
 router.get('/', async(req,res) =>{
     let invoice = await invoice.find();
     res.send(invoice);
 })
 
 router.put('/:id' , async (req,res) =>{
     let id = req.params.id;
     await invoice.updateOne({id: id} , req.body);
     res.send('Service request approved/rejected');
 })
 
 
 module.exports = router;