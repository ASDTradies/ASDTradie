let express = require('express');
let router = express.Router();
let uniqid = require('uniqid');
// getting the service request model
let ServiceRequest = require('../models/serviceRequests-model').ServiceRequest;
// getting the service model
let Service = require('../models/services-model').Service;
// router to post the service request
router.post('/' , async (req, res) =>{
   //console.log(req.body);
    // getting the service request details from the request body and storing it in a variable
   let serviceRequested = Service.findOne({id: req.body.serviceId}).then(service =>{
    console.log(service.tradieID)
    console.log(req.session.userID)
    // creating a new service request with the serviceId and the userId
    let newServiceRequest = new ServiceRequest({
        id: uniqid(),
        serviceId: req.body.serviceId,
        stage: req.body.stage,
        date: new Date(),
        hoursWorked: req.body.hoursWorked,
        priceByHour: req.body.priceByHour,
        tradieID: service.tradieID,
        customerID: req.session.userID
    });
    newServiceRequest.save();
    res.send('Service requested');
   })
})
// router to get all the service requests
router.get('/', async(req,res) =>{
    let serviceRequest = await ServiceRequest.find();
    res.send(serviceRequest);
})
// router to update the service request by id
router.put('/:id' , async (req,res) =>{
    let id = req.params.id;
    await ServiceRequest.updateOne({id: id} , req.body);
    res.send('Service request approved/rejected');
})

module.exports = router;