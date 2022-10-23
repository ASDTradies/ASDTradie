let express = require('express');
let router = express.Router();
let ServiceRequest = require('../models/serviceRequests-model').ServiceRequest;

//get all the service requests that have query in their hoursWorked or priceByHour or stage
router.get('/', async (req, res) => {
    let searchRequestQuery = req.query.searchRequestQuery;
    console.log(searchRequestQuery);
    let serviceRequest = await ServiceRequest.find({
        $or: [
            { hoursWorked: { $regex: searchRequestQuery, $options: 'i' } },
            { priceByHour: { $regex: searchRequestQuery, $options: 'i' } },
            { stage: { $regex: searchRequestQuery, $options: 'i' } }
        ]
    });
    res.send(serviceRequest);
});



module.exports = router;