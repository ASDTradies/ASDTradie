let express = require('express');
let router = express.Router();
// getting the service model
let Service = require('../models/services-model').Service;
const passport = require('passport');

let uniqid = require('uniqid');

//creating service routers
router.get('/' , async (req,res) =>{
    // getting the services from the database
    let services = await Service.find();
    res.send(services);
});
// router to post a service
router.post('/' , async (req,res) =>{
    console.log(req.session.userID)
    // getting the data from the request
    let reqBody = req.body;
    // creating a new service with the data from the request
    let newService = new Service({
    id: uniqid(),
    serviceTitle: reqBody.serviceTitle,
    description: reqBody.description,
    longDescription: reqBody.longDescription,
    imageURL:  reqBody.imageURL,
    tradieID: req.session.userID
   });
   await newService.save();
   // sending a message to the client
   res.send('Service have been created');
});

// router to get a service by id
router.get('/:id' , async (req,res) =>{
    // getting the id from the request
    let id = req.params.id;
    // getting the service from the database by id
    let service = await Service.findOne({id: id});
    // sending the service to the client
    res.send(service);
});

// router to update a service by id
router.put('/:id', async (req,res) => {
    // getting the id from the request
    let id = req.params.id;
    // updating the service in the database by id
    await Service.updateOne({id: id} , req.body);
    // sending a message to the client
    res.send('Service have been updated');
});

module.exports = router;