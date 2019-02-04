var createError = require('http-errors');
var express = require('express');
var path = require('path');

var dotenv = require("dotenv").config();
var jwt = require('jsonwebtoken');



var publicRouter = require("./routes/public/index");
var privateRouter = require("./routes/private/index");


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



app.use('/',publicRouter);
app.use('/', validateUser,privateRouter);


function validateUser(req, res, next) {
  jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function (err, decoded) {
    console.log(req.headers['x-access-token'])
    if (err) {
      res.json({ status: "error", message: err.message, data: null });
    } else {
      // add user id to request
      req.body.userId = decoded.id;
      next();
    }
  })
}


module.exports = app;
