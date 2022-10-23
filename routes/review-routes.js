let express = require('express');
let router = express.Router();
let Review = require('../models/reviews-model.js').Review;
let ServiceRequest = require('../models/serviceRequests-model').ServiceRequest;
let uniqid = require('uniqid');


router.get('/', async(req,res) =>{
    let reviews = await Review.find();
    res.send(reviews);
})

router.post('/', async(req,res) =>{
    let reqBody = req.body;
   let serviceRequest = await ServiceRequest.findOne({id: reqBody.serviceRequestId});
   console.log(serviceRequest);
    let newReview = new Review({
        id:uniqid(),
        serviceId: serviceRequest.serviceId,
        serviceRequestId:reqBody.serviceRequestId,
        reviewName:reqBody.reviewName,
        review: reqBody.review,
        
});
await newReview.save();
res.send('review saved');
});


router.delete('/:id', async(req,res) =>{
    let id = req.params.id;
    await Review.deleteOne({id: id});
    res.send('review deleted');
})

module.exports = router;
