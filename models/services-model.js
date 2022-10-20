let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let serviceSchema = new Schema({
    id: String,
    serviceTitle: String,
    description: String,
    longDescription: String,
    imageURL:  String,
    tradieID: String
});

let Service = mongoose.model('Service' , serviceSchema);

//create test service
let serviceTest = new Service({
    serviceTitle: 'Lorem',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim quaerat ea in laboriosam vel nam voluptatibus odit expedita dolore repellendus.',
    longDescription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim quaerat ea in laboriosam vel nam voluptatibus odit expedita dolore repellendus.Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim quaerat ea in laboriosam vel nam voluptatibus odit expedita dolore repellendus.',
    imgURL:  'https://image.shutterstock.com/image-photo/tradesman-concreting-path-australia-yellow-600w-1885597630.jpg'
});


//serviceTest.save().then(() => console.log('saved1'));

module.exports = { Service : Service};

