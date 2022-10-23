let mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/tradieTrade');

//mongoose.connect('mongodb+srv://Aliza:Asdf1234@cluster0.ukmib.mongodb.net/tradieTrade');

let Schema = mongoose.Schema;

let commentScheme = new Schema({
    id: String,
    serviceRequestId: String,
    name: String,
    comment: String

});

let Comment = mongoose.model('Comment' , commentScheme);


let commentTest = new Comment({
    serviceRequestId: 'test',
    comment: 'test'
});

//  commentTest.save().then(() =>  console.log('saved'));

module.exports = { Comment : Comment};

