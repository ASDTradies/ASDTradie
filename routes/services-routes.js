let express = require('express');
let router = express.Router();
let Service = require('../models/services-model').Service;

let uniqid = require('uniqid');

//creating service routers
router.get('/' , async (req,res) =>{
    let services = await Service.find();
    res.send(services);
});
router.post('/' , async (req,res) =>{
    let reqBody = req.body;
   let newService = new Service({
    id: uniqid(),
    serviceTitle: reqBody.serviceTitle,
    description: reqBody.description,
    longDescription: reqBody.longDescription,
    imageURL:  reqBody.imageURL,
    date: new Date()
   });
   await newService.save();
   res.send('Service have been created');
});
router.get('/:id' , async (req,res) =>{
    let id = req.params.id;
    let service = await Service.findOne({id: id});
    res.send(service);
});
router.put('/:id', async (req,res) => {
    let id = req.params.id;
    await Service.updateOne({id: id} , req.body);
    res.send('Service have been updated');
});

module.exports = router;