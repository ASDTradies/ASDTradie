let express = require('express');
let app = express();
app.use(express.static('public'));
let mongoose = require('mongoose');
let Service = require('./models/services-model').Service;
let OrderServiceHistory = require('./models/orderServiceHistory-model').OrderServiceHistory;

mongoose.connect('mongodb+srv://ASD:asd123@tradietrade.3zgqqzy.mongodb.net/tradieTrade');
//create test service
let service1 = new Service({
    serviceHeading: 'test',
    description: 'test',
    longDescription: 'test',
    imgURL:  'test'
});

//service1.save().then(() => console.log('saved'));
//create test orderService
let orderServiceHistoryTest = new OrderServiceHistory({
    requestId: 'test',
    billingId: 'test'
});

 //orderServiceHistoryTest.save().then(() =>  console.log('saved order'));

app.listen('3000', () => console.log('listening at 3000'));