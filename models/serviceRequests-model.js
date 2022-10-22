let mongoose = require('mongoose');


let Schema = mongoose.Schema;

let serviceRequestSchema = new Schema({
    id: String,
    serviceId: String,
    stage: String,
    date: String,
    tradieID: String,
    customerID: String,
    serviceTitle: String,
    priceByHour: Number,
    hoursWorked: Number
});

let ServiceRequest = mongoose.model('ServiceRequest' , serviceRequestSchema);


let serviceRequestTest = new ServiceRequest({
    serviceId: 'test',
    stage: 'test'
});

//  service1.save().then(() =>  console.log('saved'));

module.exports = { ServiceRequest : ServiceRequest};

