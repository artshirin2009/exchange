var express = require('express');
var router = express.Router();
var verifyToken = require('../../config/verifyToken');
var mongoose = require('mongoose');
var multerUpload = require('../../config/file-upload');
//var bcrypt = require('bcrypt')
var routes = require('./postRoutes');

/**All posts */
router.get('/', routes.getAllPosts);

/**Create post */
router.post('/', routes.createPost);

// /**Edit post */
// router.get('/', routes.getAllPosts);

// /**Delete post */
// router.get('/', routes.getAllPosts);

module.exports = router;
