//Start an Express Server and declare npm dependencies
const express = require('express');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const session_secret = 'gftdtd67i!@##(67454sdfsd!@#!24rsrfdxv$@^hvkh90&&(()!!@*89787@@56!!5334arxghbj'
const app = express();

//pasport config
require('./config/passport')(passport);

//Handles MongoDB connection
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://ASD:asd123@tradietrade.3zgqqzy.mongodb.net/tradieTrade');

//Collections (aka data requirements) to be imported from /model
let Service = require('./models/services-model').Service;
let ServiceRequest = require('./models/serviceRequests-model').ServiceRequest;

app.use(express.json()); // Tells the server to use .json (API)
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
app.set('view engine', 'ejs');
app.use(session({ //express session
    secret: session_secret,
    resave: true,
    saveUninitialized: true
  }));

//Passport methods, just got them from documentation - initialising middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//res.locals makes these global variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

//Routes
let serviceRouter = require('./routes/services-routes');
let requestServiceRouter = require('./routes/requestService-routes');
let usersRouter = require('./routes/users.js');
let invoiceRouter = require('./routes/invoice.js');
let customerDashboardRouter = require('./routes/customerDashboard.js');
let indexRouter = require('./routes/index.js');
let reviewRouter = require('./routes/review-routes.js');
let searchRouter = require('./routes/search-routes.js');
let searchRequestRouter = require('./routes/searchRequest-routes.js');
let searchRequestCDRouter = require('./routes/searchRequestCD-routes.js');
let searchReviewRouter = require('./routes/searchReview-routes.js');
let filterRouter = require('./routes/filter-routes.js');
let reviewsDPRouter = require('./routes/reviewsDP-routes.js');
let commentsRouter = require('./routes/comments-routes.js');
app.get('/serviceDP', async (req, res) =>{
    let id = req.query.id;
    let service = await Service.findOne({id: id});
    res.render('serviceDP' , {
        id : service.id,
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
        description: service.description,
        priceByHour : serviceRequest.priceByHour,
        hoursWorked: serviceRequest.hoursWorked
    })
})

app.use('/index' ,indexRouter);
app.use('/service' ,serviceRouter);
app.use('/requestService' ,requestServiceRouter);
app.use('/users', usersRouter)
app.use('/invoice', invoiceRouter);
app.use('/customerDashboard', customerDashboardRouter);
app.use('/reviews', reviewRouter);
app.use('/search', searchRouter);
app.use('/searchRequest', searchRequestRouter);
app.use('/searchRequestCD', searchRequestCDRouter);
app.use('/searchReview', searchReviewRouter);
app.use('/filter', filterRouter);
app.use('/reviewsDP', reviewsDPRouter);
app.use('/comments', commentsRouter);
app.listen('3000', () => console.log('listening at 3000'));