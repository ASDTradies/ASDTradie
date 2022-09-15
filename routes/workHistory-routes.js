let express = require('express');
let router = express.Router();
let uniqid = require('uniqid');
let WorkHistory = require('../models/workHistories-model').WorkHistory;

router.post('/' , async (req, res) =>{
    //console.log(req.body);
     let newWork = new WorkHistory({
         invoiceId: uniqid(),
         requestId: req.body.requestId,
     });
     await newWork.save();
     res.send('Work requested');
 })
 
 router.get('/', async(req,res) =>{
     let work = await work.find();
     res.send(work);
 })
 
 router.put('/:invoiceId' , async (req,res) =>{
     let invoiceId = req.params.invoiceId;
     await work.updateOne({invoiceId: invoiceId} , req.body);
     res.send('work request approved/rejected');
 })

 module.exports = router;