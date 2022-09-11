let express = require('express');
let app = express();

//Handles MongoDB connection
let mongoose = require('mongoose');
mongoose.connect('mongodb+srv://ASD:asd123@tradietrade.3zgqqzy.mongodb.net/tradieTrade');

//Collections to be imported from /model
let Service = require('./models/services-model').Service;
let ServiceRequest = require('./models/serviceRequests-model').ServiceRequest;
let User = require('./models/users-model').User;

app.use(express.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');

let serviceRouter = require('./routes/services-routes');
let requestServiceRouter = require('./routes/requestService-routes');
let registerUserRouter = require('./routes/registerUser-routes');

//Register 
app.post('/register', async (req,res) =>{
    console.log(req.body);
    try{
        const response = await User.create({
            first_name,
            last_name,
            email,
            password,
            profileType
        })
        console.log("User created successfully", response);
    } catch (error) {
        console.log(error);
        return res.json({status: 'error'});
    }
    res.json({status: 'ok'});
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