let mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/tradieTrade');

//mongoose.connect('mongodb+srv://Aliza:Asdf1234@cluster0.ukmib.mongodb.net/tradieTrade');

let Schema = mongoose.Schema;

const invoiceSchema = new mongoose.Schema({
    invId: String,
    invRequestID: String,
    invServiceID: String,
    invCustomerID: String,
    invTradieID: String,
    invAddress: String,
    invDate: Date,
    invPrice: String,
},
{ collection: 'invoices' } 
);
const Invoice = mongoose.model('Invoice', invoiceSchema);
module.exports = { Invoice : Invoice};