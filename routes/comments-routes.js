let express = require('express');
let router = express.Router();
let Comment = require('../models/comments-model').Comment;
let uniqid = require('uniqid');


router.get('/', async(req,res) =>{
    let comments = await Comment.find();
    res.send(comments);
})

router.post('/', async(req,res) =>{
    let reqBody = req.body;
    let newComment = new Comment({
        id:uniqid(),
        serviceRequestId:reqBody.serviceRequestId,
        name:reqBody.name,
        comment: reqBody.comments,

});
await newComment.save();
res.send('Comment saved');
});



module.exports = router;
