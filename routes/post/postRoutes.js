var Post = require('../../models/post');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');

module.exports = {
  getAllPosts: function (req, res, next) {
    Post.find({}, function (err, posts) {
      res.json(posts)
    })
  },
  createPost: function (req, res, next) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        var title = req.body.title;
        Post.find({ title }, function (err, doc) {
          if (doc.length <= 0) {
            var post = {
              _id: new mongoose.Types.ObjectId(),
              title: req.body.title,
              image: req.file.path.slice(15),
              description: req.body.description,
              created_user: authData.user.name
            };
            var newPost = new Post(post);
            newPost.save(function (err, post) {
              res.json(post);
            });
          }
          else {
            res.json('Post exists')
          }
        })

      }
    });
  },
  editPost: function (req, res, next) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        console.log(authData)
        if (authData.user.isAdmin) {
          var id = req.body.id;
          Post.findByIdAndUpdate(id, {
            title: req.body.title,
            description: req.body.description,
            image: req.file.path.slice(15),
          }, function (err, doc) { res.json('Post edited') })
        }
        else{res.json('You can edit only your posts')}

      }
    });
  },

};

