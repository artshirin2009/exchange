var Comment = require('../../models/comment')
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var Post = require('../../models/post')

module.exports = {
  /**Create comment */
  createComment: function (req, res, next) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        var comment = new Comment(
          {
            author: authData.user._id,
            content: req.body.content,
            postId: req.params.postId 
          }
        );
        comment.save();
        Post.findById(req.params.postId).populate('comments').exec(function(err, post){
          post.comments.push(comment);
          post.save();
          res.json(post) 
      });
      }
    });
  },
  /**All posts */
  getCommentsFromPost: function (req, res, next) {
    var postId = req.params.postId
    Comment.find({ postId: postId }, function (err, comments) {
      res.json(comments)
    })
  },
  /**Edit post*/
  editComment: function (req, res, next) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
      if (err) {res.sendStatus(403);}
      if (authData.user.isAdmin) {
        var id = req.params.commentId;
        Comment.findById({ _id: id }, function (err, comment) {
          if (req.body.content) { comment.content = req.body.content }
          comment.save(function (err, comment) {
            if (err) return res.json(err);
            res.json(['Comment updated by admin', comment]);
          })
        })
      }
      if (!authData.user.isAdmin) {
        var id = req.params.commentId;
        Comment.findById({ _id: id }, function (err, comment) {
          if (comment!=undefined && comment.author == authData.user._id) {
            if (req.body.content) { comment.content = req.body.content }
            comment.save(function (err, comment) {
              if (err) return res.json(err);
              res.json(['Comment updated by user', comment]);
            })
          }
          else { res.json('You can edit only your comments') }
        })
      }
    });
  },
/**Delete post*/
  deleteComment:function (req, res, next) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
      if (err) {
        res.sendStatus(403);
      }
      if (authData.user.isAdmin) {
        var id = req.params.commentId;
        Comment.deleteOne({ _id:  id }, function (err, doc) { res.json('Comment deleted') })
      }
      else { 
        var id = req.params.commentId;
        Comment.findById({ _id: id }, function (err, comment) {
          if (err) res.json(err);
          if(comment!=undefined && comment.author==authData.user._id) {
            Comment.deleteOne({ _id:  id }, function (err, doc) { res.json('Comment deleted') })
          }
          else {
            if(id){res.json('You can delete only your comments')}
            else{}
           }
        })
      }
    });
  },

  /**All posts */
  // getPosts: function (req, res, next) {
    
  //   Comment.find({ }).populate('postId').exec(function(err,doc){
  //     res.json(doc)
  //   })
  // },






};

