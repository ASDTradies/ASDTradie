let express = require('express');
let router = express.Router();
let Review = require('../models/reviews-model').Review;
let uniqid = require('uniqid');


router.get('/reviewForm', async(req,res) =>{
    res.render('reviewForm.ejs')
})


router.delete('/:id', async(req,res) =>{
    let id = req.params.id;
    await Review.deleteOne({id: id});
    res.send('review deleted');
})

module.exports = router;
