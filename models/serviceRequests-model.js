let mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/tradieTrade');

//mongoose.connect('mongodb+srv://Aliza:Asdf1234@cluster0.ukmib.mongodb.net/tradieTrade');

let Schema = mongoose.Schema;

let serviceRequestSchema = new Schema({
    id: String,
    serviceId: String,
    stage: String
});

let ServiceRequest = mongoose.model('Service' , serviceRequestSchema);


let serviceRequestTest = new ServiceRequest({
    serviceId: 'test',
    stage: 'test'
});

//  service1.save().then(() =>  console.log('saved'));

module.exports = { ServiceRequest : ServiceRequest};

