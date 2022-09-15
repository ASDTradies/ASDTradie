let express = require('express');
let router = express.Router();
let uniqid = require('uniqid');
let OrderHistory = require('../models/orderServiceHistory-model').OrderHistory;

router.post('/' , async (req, res) =>{
    //console.log(req.body);
     let newOrder = new OrderHistory({
         invoiceId: uniqid(),
         requestId: req.body.requestId,
     });
     await newOrder.save();
     res.send('Order requested');
 })
 
 router.get('/', async(req,res) =>{
     let order = await order.find();
     res.send(order);
 })
 
 router.put('/:invoiceId' , async (req,res) =>{
     let invoiceId = req.params.invoiceId;
     await order.updateOne({invoiceId: invoiceId} , req.body);
     res.send('order request approved/rejected');
 })

 module.exports = router;