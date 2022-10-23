let express = require('express');
let router = express.Router();
let ServiceRequest = require('../models/serviceRequests-model').ServiceRequest;

//get all the service requests depending on the stage
router.get('/', async (req, res) => {
    let stage = req.query.stage;
    console.log(stage);
    let serviceRequest = await ServiceRequest.find({stage: stage});
    res.send(serviceRequest);
});

module.exports = router;