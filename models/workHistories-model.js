let mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/tradieTrade');

//mongoose.connect('mongodb+srv://Aliza:Asdf1234@cluster0.ukmib.mongodb.net/tradieTrade');

let Schema = mongoose.Schema;

let workHistoryScheme = new Schema({
    id: String,
    requestId: String,
    invoiceId: String

});

let WorkHistory = mongoose.model('WorkHistory' , workHistoryScheme);


let workHistoryTest = new WorkHistory({
    requestId: 'test',
    invoiceId: 'test'
});

//  workHistoryTest.save().then(() =>  console.log('saved'));

module.exports = { WorkHistory : WorkHistory};

