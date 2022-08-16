let mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/tradieTrade');

//mongoose.connect('mongodb+srv://Aliza:Asdf1234@cluster0.ukmib.mongodb.net/tradieTrade');

let Schema = mongoose.Schema;

let serviceSchema = new Schema({
    id: String,
    serviceHeading: String,
    description: String,
    longDescription: String,
    imgURL:  String
});

let Service = mongoose.model('Service' , serviceSchema);


let service1 = new Service({
    serviceHeading: 'test',
    description: 'test',
    longDescription: 'test',
    imgURL:  'test'
});

//  service1.save().then(() =>  console.log('saved'));

module.exports = { Service : Service};

