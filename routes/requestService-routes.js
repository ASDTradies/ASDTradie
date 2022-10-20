let express = require('express');
let router = express.Router();
let uniqid = require('uniqid');
let ServiceRequest = require('../models/serviceRequests-model').ServiceRequest;
let Service = require('../models/services-model').Service;

router.post('/' , async (req, res) =>{
   //console.log(req.body);
   let serviceRequested = Service.findOne({id: req.body.serviceId}).then(service =>{
    console.log(service.tradieID)
    console.log(req.session.userID)
    let newServiceRequest = new ServiceRequest({
        id: uniqid(),
        serviceId: req.body.serviceId,
        stage: req.body.stage,
        date: new Date(),
        tradieID: service.tradieID,
        customerID: req.session.userID
    });
    newServiceRequest.save();
    res.send('Service requested');
   })
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