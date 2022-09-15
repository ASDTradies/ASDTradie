let mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/tradieTrade');

//mongoose.connect('mongodb+srv://Aliza:Asdf1234@cluster0.ukmib.mongodb.net/tradieTrade');

let Schema = mongoose.Schema;

let orderServiceHistoryScheme = new Schema({
    id: String,
    requestId: String,
    inoviceId: String

});

let OrderServiceHistory = mongoose.model('OrderServiceHistory' , orderServiceHistoryScheme);


let orderServiceHistoryTest = new OrderServiceHistory({
    requestId: 'test',
    invoiceId: 'test'
});

//  orderServiceHistoryTest.save().then(() =>  console.log('saved'));

module.exports = { OrderServiceHistory : OrderServiceHistory};

