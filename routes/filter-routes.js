let express = require('express');
let router = express.Router();
// getting the service request model
let ServiceRequest = require('../models/serviceRequests-model').ServiceRequest;

//get all the service requests depending on the stage
router.get('/', async (req, res) => {
    // getting the stage from the query
    let stage = req.query.stage;
    console.log(stage);
    // getting the service requests from the database
    let serviceRequest = await ServiceRequest.find({stage: stage});
    res.send(serviceRequest);
});
module.exports = router;