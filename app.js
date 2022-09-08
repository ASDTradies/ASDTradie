let express = require('express');
let app = express();
let mongoose = require('mongoose');
mongoose.connect('mongodb+srv://ASD:asd123@tradietrade.3zgqqzy.mongodb.net/tradieTrade');
let Service = require('./models/services-model').Service;
let ServiceRequest = require('./models/serviceRequests-model').ServiceRequest;

app.use(express.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');

let serviceRouter = require('./routes/services-routes');
let requestServiceRouter = require('./routes/requestService-routes');

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


app.listen('3000', () => console.log('listening at 3000'));