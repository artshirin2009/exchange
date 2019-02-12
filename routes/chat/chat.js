var express = require('express');
var router = express.Router();
var verifyToken = require('../../config/verifyToken');
var mongoose = require('mongoose');
var multerUpload = require('../../config/file-upload');
//var bcrypt = require('bcrypt')
var routes = require('./chatRoutes');


/**Chat route */
router.get('/chat', routes.chat);


module.exports = router;
