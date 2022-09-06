let mongoose = require('mongoose');


let Schema = mongoose.Schema;

let serviceRequestSchema = new Schema({
    id: String,
    serviceId: String,
    stage: String
});

let ServiceRequest = mongoose.model('ServiceRequest' , serviceRequestSchema);


let serviceRequestTest = new ServiceRequest({
    serviceId: 'test',
    stage: 'test'
});

//  service1.save().then(() =>  console.log('saved'));

module.exports = { ServiceRequest : ServiceRequest};

