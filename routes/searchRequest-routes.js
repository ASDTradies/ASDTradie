let express = require('express');
let router = express.Router();
// getting the service request model
let ServiceRequest = require('../models/serviceRequests-model').ServiceRequest;

//get all the service requests that have query in their hoursWorked or priceByHour or stage
router.get('/', async (req, res) => {
    // getting the query from the request
    let searchRequestQuery = req.query.searchRequestQuery;
    console.log(searchRequestQuery);
    // getting the service requests from the database that have the query in their hoursWorked or priceByHour or stage
    let serviceRequest = await ServiceRequest.find({
        $or: [
            { hoursWorked: { $regex: searchRequestQuery, $options: 'i' } },
            { priceByHour: { $regex: searchRequestQuery, $options: 'i' } },
            { stage: { $regex: searchRequestQuery, $options: 'i' } }
        ]
    });
    // sending the service requests to the client
    res.send(serviceRequest);
});



module.exports = router;