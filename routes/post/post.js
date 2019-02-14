var express = require('express');
var router = express.Router();
var verifyToken = require('../../config/verifyToken');
var mongoose = require('mongoose');
var multerUpload = require('../../config/file-upload');
var routes = require('./postRoutes');

/**All posts */
router.get('/posts', routes.getAllPosts);

/**Get post by Id */
router.get('/posts/:postId', routes.getPostById);

/**Create post */
router.post('/post', verifyToken, multerUpload.single('imageFile'), routes.createPost);

/**Edit post*/
router.put('/post/:post', verifyToken, multerUpload.single('imageFile'), routes.editPost);

/**Delete post */
router.delete('/post/:post', verifyToken, routes.deletePost);

module.exports = router;
