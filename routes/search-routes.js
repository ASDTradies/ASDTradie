let express = require('express');
let router = express.Router();
let Service = require('../models/services-model').Service;


// get services that have query in their title or description
router.get('/searchService/' , async (req,res) =>{
    let query = req.query.searchQuery;
    let services = await Service.find({$or: [{serviceTitle: {$regex: query,$options: 'i'}},{description: {$regex: query,$options: 'i'}}]});
    res.send(services);
});


module.exports = router;