let express = require('express');
let app = express();
let mongoose = require('mongoose');
mongoose.connect('mongodb+srv://ASD:asd123@tradietrade.3zgqqzy.mongodb.net/tradieTrade');
app.use(express.json());
app.use(express.static('public'));

let serviceRouter = require('./routes/services-routes');
let requestServiceRouter = require('./routes/requestService-routes');


app.use('/service' ,serviceRouter);
app.use('/requestService' ,requestServiceRouter);


app.listen('3000', () => console.log('listening at 3000'));