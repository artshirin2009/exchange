var createError = require('http-errors');
var express = require('express');
var path = require('path');

var mongoose = require('mongoose')


var cors = require('cors')

var dotenv = require('dotenv').config();
var jwt = require('jsonwebtoken');

var userRouter = require('./routes/user/user');
var userPosts = require('./routes/post/post');
var userComments = require('./routes/comment/comment');

require('./config/database');

var app = express();

app.set('secretKey', 'nodeRestApi'); // jwt secret token
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));


app.use('/', userPosts);
app.use('/', userRouter);
app.use('/', userComments);


module.exports = app;
