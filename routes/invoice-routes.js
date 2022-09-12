let express = require('express');
let router = express.Router();
let uniqid = require('uniqid');
let ServiceRequest = require('../models/invoice-model').Invoice;