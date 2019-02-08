var express = require('express');
var router = express.Router();
var verifyToken = require('../../config/verifyToken');
var mongoose = require('mongoose');
var multerUpload = require('../../config/file-upload');
var routes = require('./commentRoutes');

/**Get comments of post */
 router.get('/post/:postId/comments', routes.getCommentsFromPost);

/**Create comment */
 router.post('/post/:postId/comment',verifyToken, routes.createComment);

/**Edit comment*/
router.put('/post/:postId/comment/:commentId', verifyToken, routes.editComment);

/**Delete comment */
router.delete('/post/:postId/comment/:commentId', verifyToken, routes.deleteComment);



/**Get comments of post */
// router.get('/posts-comment', routes.getPosts);

module.exports = router;
