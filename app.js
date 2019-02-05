var createError = require('http-errors');
var express = require('express');
var path = require('path');

var mongoose = require('mongoose')


var cors = require('cors')

var dotenv = require('dotenv').config();
var jwt = require('jsonwebtoken');

var indexRouter = require('./routes/index');

require('./config/validateuser');
require('./config/database');

var app = express();

app.set('secretKey', 'nodeRestApi'); // jwt secret token
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));



app.use('/', indexRouter);

module.exports = app;
