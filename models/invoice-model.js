//[REQUIRED CONNECTIONS]
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//MongoDB Invoice Schema for data processing and creation
const invoiceSchema = new mongoose.Schema({
    service_requestID: String,
    service_title: String,
    userID: String,
    first_name: String,
    last_name: String, 
    tradieID: String,
    hours: String,
    street_address: String,
    date: String,
    phone_number: String,
    city: String,
    state: String,
    post_code: String,
    price: String,
    street_address: String
},
{ collection: 'invoices' } 
);
const Invoice = mongoose.model('Invoice', invoiceSchema);
module.exports = { Invoice : Invoice};