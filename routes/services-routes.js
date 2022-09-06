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
    imageURL:  reqBody.imageURL
   });
   await newService.save();
   res.send('Service have been created');
});
router.put('/:id', async (req,res) => {
    let serviceToUpdate = await Service.findOne(req.params.id);
    serviceToUpdate.update();
    res.send('Service have been updated');
});

module.exports = router;