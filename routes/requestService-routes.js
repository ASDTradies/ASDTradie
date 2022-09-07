let express = require('express');
let router = express.Router();
let uniqid = require('uniqid');
let ServiceRequest = require('../models/serviceRequests-model').ServiceRequest;

router.post('/' , async (req, res) =>{
   //console.log(req.body);
    let newServiceRequest = new ServiceRequest({
        id: uniqid(),
        serviceId: req.body.serviceId,
        stage: req.body.stage
    });

    await newServiceRequest.save();
    res.send('Service requested');
})

router.get('/', async(req,res) =>{
    let serviceRequest = await ServiceRequest.find();
    res.send(serviceRequest);
})

router.put('/:id' , async (req,res) =>{
    let id = req.params.id;
    await ServiceRequest.updateOne({id: id} , req.body);
    res.send('Service request approved/rejected');
})


module.exports = router;