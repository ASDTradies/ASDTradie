let express = require('express');
let router = express.Router();
let Review = require('../models/reviews-model').Review;

//get all reviews that have query in reviewName or review
router.get('/', async (req, res) => {
    let searchReviewQuery = req.query.searchReviewQuery;
    console.log(searchReviewQuery);
    let review = await Review.find({
        $or: [
            { reviewName: { $regex: searchReviewQuery, $options: 'i' } },
            { review: { $regex: searchReviewQuery, $options: 'i' } }
        ]
    });
    res.send(review);
});

module.exports = router;