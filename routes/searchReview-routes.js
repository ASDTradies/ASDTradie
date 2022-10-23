let express = require('express');
let router = express.Router();
// getting the review model
let Review = require('../models/reviews-model').Review;

//get all reviews that have query in reviewName or review
router.get('/', async (req, res) => {
    // getting the query from the request
    let searchReviewQuery = req.query.searchReviewQuery;
    console.log(searchReviewQuery);
    // getting the reviews from the database that have the query in their reviewName or review
    let review = await Review.find({
        $or: [
            { reviewName: { $regex: searchReviewQuery, $options: 'i' } },
            { review: { $regex: searchReviewQuery, $options: 'i' } }
        ]
    });
    // sending the reviews to the client
    res.send(review);
});

module.exports = router;