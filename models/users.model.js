let mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/tradieTrade');

//mongoose.connect('mongodb+srv://Aliza:Asdf1234@cluster0.ukmib.mongodb.net/tradieTrade');

let Schema = mongoose.Schema;

let userScheme = new Schema({
    id: String,
    title: String,
    firstName: String,
    lastName: String,
    addressStreet: String,
    addressCity: String,
    addressState: String,
    addressPostcode: String, 
    dateOfBirth: String,
    personalBio: String,
    profileImgURL:  String,
    type: String, //this type is to distinguish if the user is customer or tradie

});

let User = mongoose.model('User' , userScheme);


let userTest = new User({
    title: 'Miss',
    firstName: 'Aliza',
    lastName: 'Faisal',
    addressStreet: 'Test',
    addressCity: 'test',
    addressState: 'test',
    addressPostcode: 'test', 
    dateOfBirth: 'test',
    personalBio: 'test',
    profileImgURL:  'test',
    type: 'Customer'
});

//  userTest.save().then(() =>  console.log('saved'));

module.exports = { User : User};

