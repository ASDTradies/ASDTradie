let express = require('express');
let router = express.Router();
let uniqid = require('uniqid');
const Invoice = require('../models/invoice-model').Invoice;

router.post('/createInvoice',  (req, res) =>{
    const { invRequestID, invServiceID, invCustomerID, invTradieID, invAddress, invDate, invPrice, invPaid} = req.body;
    var errors = []; //Error messages

    //Check required fields
   // if(!first_name || !last_name || !email || !password || !password2){
    //    errors.push({msg: 'Please fill in all fields'});
   // }

    //Passwords do not match
    //if(password !== password2){
    //    errors.push({msg: 'Passwords do not match'});
   // }

   // if(errors.length > 0){    //If there is an error, render the error messages
    //    res.render('registerUser', {
    //        errors,
     ////       first_name,
     //       last_name,
      //      email,
      //      password,
       //     password2
        //})
    //} else { //Otherwise, find the user using email
     //   User.findOne({email: email}).then(user => {
       //     if(user) { //User not null, already exists in the db
        //        errors.push({msg: 'Email is already in use!'})
         //       res.render('registerUser', {
         //           errors,
         //           first_name,
          ////          last_name,
          //          email,
           //         password,
            //        password2
           //     })
         //   } else {
                const newInvoice = new Invoice({
                    invRequestID,
                    invServiceID, 
                    invCustomerID, 
                    invTradieID, 
                    invAddress, 
                    invDate, 
                    invPrice, 
                    invPaid
                });
               // bcrypt.genSalt(10, function(err, salt){ //Hashing the password before storage
               //     bcrypt.hash(newUser.password, salt, (err,hash) => {
               //         if(err) throw err;
                //        newUser.password = hash;
                //        newUser.save()
                 //       .then(user => {
                  //          req.flash('success_msg', 'Registration successful!')
                 //           res.redirect('/users/login')
                  //      })
                  //      .catch(err => console.log(err));
                   // })
               // })
          //  }
       // })
  //  }


})
module.exports = router;