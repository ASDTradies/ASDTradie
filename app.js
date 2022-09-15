//Start an Express Server and declare npm dependencies
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken'); //JSONWebToken - for login and logout
const bcrypt = require('bcryptjs'); //Bcrypt - for lightweight hashing
const JWT_Secret = 'gftdtd67i!@##(67454sdfsd!@#!24rsrfdxv$@^hvkh90&&(()!!@*89787@@56!!5334arxghbj'
//Handles MongoDB connection
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://ASD:asd123@tradietrade.3zgqqzy.mongodb.net/tradieTrade');

//Collections (aka data requirements) to be imported from /model
let Service = require('./models/services-model').Service;
let ServiceRequest = require('./models/serviceRequests-model').ServiceRequest;
let User = require('./models/users-model').User;

app.use(express.json()); // Tells the server to use .json (API)
app.use(express.static('public'));
app.set('view engine', 'ejs');

//Routers
let serviceRouter = require('./routes/services-routes');
let requestServiceRouter = require('./routes/requestService-routes');
let registerUserRouter = require('./routes/registerUser-routes');

//Register 
app.post('/register', async (req,res) =>{
    let {first_name, last_name, email, password: plainTextPassword, profileType} = req.body;    
    bcrypt.genSalt(10, function(err, salt) { //generates salt 10x
        bcrypt.hash(plainTextPassword, salt, function(err, hash) { //hashes password for storing
            let password = hash;
            try {
                const response = User.create({
                    first_name,
                    last_name,
                    email,
                    password,
                    profileType
                });
                console.log("User created successfully", response);
            } catch (error) {
                if (error.code === 11000) {  // error 11000 means duplicate email
                    return res.json({ status: 'error', error: 'Email is already in use!' });
                }
                throw error;
            };
            res.json({status: 'ok'});
        });
    });
});

//Login
app.post('/login', async(req, res) =>{
    const { email, password } = req.body;
    const user = await User.findOne({email}).lean(); //Finds user via email
    if(!user){ //If user is not found
        return res.json({status: 'error', error: 'Invalid email/password'});
    };

    bcrypt.compare(password, user.password).then((result) => { //User is found
        if(result){ //If password is correct
            const token = jwt.sign( //Make a token
            {
                id: user._id,
                email: user.email
            },
                JWT_Secret
            );
            return res.json({status: 'ok', data: token});
        } else { //Wrong password
            return res.json({status: 'error', error: 'Invalid email/password'});
        }
    });
});

app.get('/serviceDP', async (req, res) =>{
    let id = req.query.id;
    let service = await Service.findOne({id: id});
    res.render('serviceDP' , {
        serviceTitle: service.serviceTitle,
        description: service.description,
        longDescription: service.longDescription,
        imageURL:  service.imageURL
    })
})

app.get('/serviceRequestDP', async(req,res) =>{
    id = req.query.id;
    let serviceRequest = await ServiceRequest.findOne({id: id});
    let serviceID =  serviceRequest.serviceId;
    let service = await Service.findOne({id: serviceID});
    res.render('serviceRequestDP', {
        serviceTitle: service.serviceTitle,
        stage: serviceRequest.stage,
        date: serviceRequest.date,
        description: service.description
    })
})

app.use('/service' ,serviceRouter);
app.use('/requestService' ,requestServiceRouter);
app.use('/registerUser' ,registerUserRouter);
app.listen('3000', () => console.log('listening at 3000'));