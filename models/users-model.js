const { Int32, Double } = require('mongodb');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        id: {type: String},
        first_name: {type: String, required: true},
        last_name: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        gender: String,
        phone: String,
        street_address: String,
        city: String,
        state: String,
        postcode: Number,
        profileType: {type: String, required: true},
        active: Boolean,
        review_count: Number,
        star_rating: Number
    },
    { collection: 'users' } 
);

const User = mongoose.model('User', userSchema);
//  service1.save().then(() =>  console.log('saved'));
module.exports = {User : User};

