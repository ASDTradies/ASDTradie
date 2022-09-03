let mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/tradieTrade');

//mongoose.connect('mongodb+srv://Aliza:Asdf1234@cluster0.ukmib.mongodb.net/tradieTrade');

let Schema = mongoose.Schema;

let billingScheme = new Schema({
    id: String,
    userId: String,
    requestId: String,
    billingApproved: Boolean

});

let Billing = mongoose.model('Billing' , billingScheme);


let billingTest = new Billing({
    userId: 'test',
    requestId: 'test',
    billingApproved: true
});

//  billingTest.save().then(() =>  console.log('saved'));

module.exports = { Billing : Billing};

//stuff
var $cardInput = $('.input-fields input');
 
$('.next-btn').on('click', function(e) {
 
  $cardInput.removeClass('warning');
 
  $cardInput.each(function() {    
     var $this = $(this);
     if (!$this.val()) {
       $this.addClass('warning');
     }
  })
});

$(document).ready(function() {
 
  $('.method').on('click', function() {
    $('.method').removeClass('blue-border');
    $(this).addClass('blue-border');
  });
 
})