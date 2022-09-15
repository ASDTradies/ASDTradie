let mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/tradieTrade');

//mongoose.connect('mongodb+srv://Aliza:Asdf1234@cluster0.ukmib.mongodb.net/tradieTrade');

let Schema = mongoose.Schema;

let invoiceScheme = new Schema({
    invoiceid: String,
    requestId: String,
    date: String,
    price: String,

});

let Invoice = mongoose.model('Invoice' , invoiceScheme);


let invoiceTest = new Invoice({
  invoiceid: 'test',
    requestId: 'test',
    date: 'test',
    price: 'test',
});

//  invoiceTest.save().then(() =>  console.log('saved'));

module.exports = { Invoice : Invoice};

//stuff
// var $cardInput = $('.input-fields input');
 
// $('.next-btn').on('click', function(e) {
 
//   $cardInput.removeClass('warning');
 
//   $cardInput.each(function() {    
//      var $this = $(this);
//      if (!$this.val()) {
//        $this.addClass('warning');
//      }
//   })
// });

// $(document).ready(function() {
 
//   $('.method').on('click', function() {
//     $('.method').removeClass('blue-border');
//     $(this).addClass('blue-border');
//   });
 
// })