let express = require('express');
let router = express.Router();
// getting the service request model
let Service = require('../models/services-model').Service;

// get services that have query in their title or description
router.get('/searchService/' , async (req,res) =>{
    // getting the query from the request
    let query = req.query.searchQuery;
    // getting the services from the database that have the query in their title or description
    let services = await Service.find({$or: [{serviceTitle: {$regex: query,$options: 'i'}},{description: {$regex: query,$options: 'i'}}]});
    res.send(services);
});


module.exports = router;