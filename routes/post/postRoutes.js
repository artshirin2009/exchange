var Post = require('../../models/post');
var mongoose = require('mongoose');

module.exports = {
  getAllPosts: function (req, res, next) {
    Post.find({}, function (err, posts) {
      res.json(posts)
    })
  },
  createPost: function (req, res, next) {

  }

};

