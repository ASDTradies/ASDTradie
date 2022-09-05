let express = require('express');
let app = express();
app.use(express.static('public'));
let mongoose = require('mongoose');
let Service = require('./models/services-model').Service;
let OrderServiceHistory = require('./models/orderServiceHistory-model').OrderServiceHistory;

mongoose.connect('mongodb+srv://ASD:asd123@tradietrade.3zgqqzy.mongodb.net/tradieTrade');

app.use(express.json());

//creating service routers

app.get('/service' , async (req,res) =>{
    let services = await Service.find();
    res.send(services);
});
app.post('/service' , async (req,res) =>{
    let id = 1;
    let reqBody = req.body;
   let newService = new Service({
    id: '' + id++,
    serviceTitle: reqBody.serviceTitle,
    description: reqBody.description,
    longDescription: reqBody.longDescription,
    imageURL:  reqBody.imageURL
   });
   await newService.save();
   res.send('Service have been created');
});
app.put('/service:id', async (req,res) => {
    let serviceToUpdate = await Service.findOne(req.params.id);
    serviceToUpdate.update();
    res.send('Service have been updated');
});

app.listen('3000', () => console.log('listening at 3000'));