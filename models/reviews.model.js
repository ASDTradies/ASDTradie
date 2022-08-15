let mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/tradieTrade');

//mongoose.connect('mongodb+srv://Aliza:Asdf1234@cluster0.ukmib.mongodb.net/tradieTrade');

let Schema = mongoose.Schema;

let reviewScheme = new Schema({
    id: String,
    serviceRequestId: String,
    review: String

});

let Review = mongoose.model('Review' , reviewScheme);


let reviewTest = new Review({
    serviceRequestId: 'test',
    review: 'test'
});

//  reviewTest.save().then(() =>  console.log('saved'));

module.exports = { Review : Review};

