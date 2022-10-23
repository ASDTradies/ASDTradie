let express = require('express');
let router = express.Router();
// getting the review model
let Review = require('../models/reviews-model').Review;

//get all the reviews depending on the service id
router.get('/', async (req, res) => {
    // getting the service id from the query
    let serviceId = req.query.serviceId;
    // getting the reviews from the database
    let reviews = await Review.find({serviceId: serviceId});
    res.send(reviews);
});
module.exports = router;
