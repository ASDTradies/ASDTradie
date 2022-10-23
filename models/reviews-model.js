let mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/tradieTrade');

//mongoose.connect('mongodb+srv://Aliza:Asdf1234@cluster0.ukmib.mongodb.net/tradieTrade');

let Schema = mongoose.Schema;

let reviewSchema = new Schema({
    id: String,
    serviceRequestId: String,
    serviceId: String,
    reviewName: String,
    review: String
});

let Review = mongoose.model('Review' , reviewSchema);


let reviewTest = new Review({
    serviceRequestId: 'test',
    reviewName: 'Gary',
    review: 'test'
});

//  reviewTest.save().then(() =>  console.log('saved'));

module.exports = { Review : Review};

