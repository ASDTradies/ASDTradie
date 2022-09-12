//Start an Express Server and declare npm dependencies
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken'); //JSONWebToken - for login and logout
const bcrypt = require('bcryptjs'); //Bcrypt - for lightweight hashing

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
	const password = await bcrypt.hash(plainTextPassword, 10);

    try {
        const response = await User.create({
            first_name,
            last_name,
            email,
            password,
            profileType
        });
        console.log("User created successfully", response);
    } catch (error) {
        // console.log("error code ", error.code);
        if (error.code === 11000) {
			// duplicate key
			return res.json({ status: 'error', error: 'Email is already in use!' });
		}
    }
    res.json({status: 'ok'});
});

//Login
app.post('/login', async(req, res) =>{
    const {email, password} = req.body;
    const user = User.findOne({email}).lean(); //Finds user via email

    //If no user exists with specified email
    if(!user) return res.json({status: 'error', error: 'Invalid email/password'}); 

    // Checks if password is correct
    if(await bcrypt.compare(password, user.password)){
        const token = jwt.sign(
            {id: user.id, email: user.email},
            JWT_Secret
            );
        return res.json({status: 'ok', data: token});
    }
    res.json({status: 'error', error: 'Invalid email/password'}); //If this is at all reached, something went wrong
})

app.get('/customerDashboard', async(req, res) =>{
    res.send('Customer Dashboard');
})

app.get('/tradieDashboard', async(req, res) =>{
    res.send('Tradie Dashboard');
})

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