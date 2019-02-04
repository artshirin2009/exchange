var createError = require('http-errors');
var express = require('express');
var path = require('path');

var dotenv = require("dotenv").config();




var indexRouter = require("./routes/index");

const mongoose = require("mongoose");
mongoose.connect(
  `${process.env.DB_URL}${process.env.DB_NAME}`,
  {
    useNewUrlParser: true
  },
  function(err) {
    if (err) throw err;
    console.log("Successfully connected");
  }
); 

var app = express();
app.set('secretKey', 'nodeRestApi'); // jwt secret token
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));



app.use('/',indexRouter);



module.exports = app;
