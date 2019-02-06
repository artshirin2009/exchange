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
router.post('/create-post', verifyToken,multerUpload.single('imageFile'), routes.createPost);

/**Edit post admin*/
router.post('/edit-post', verifyToken,multerUpload.single('imageFile'), routes.editPost);

/**Edit post admin*/
router.post('/edit-post', verifyToken,multerUpload.single('imageFile'), routes.editPost);

// /**Delete post */
// router.get('/', routes.getAllPosts);

module.exports = router;
