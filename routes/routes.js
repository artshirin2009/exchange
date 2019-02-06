var User = require('../models/users');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt')

module.exports = {
  getProfile: function (req, res, next) {
    var userId = req.params.id;
    User.findOne({ _id: userId }, function (err, obj) {
      if (err) res.json(err);
      res.json(obj);
    });
  },
  updateUser: function (req, res, next) {
    var userId = req.body.id;
    User.findOne({ _id: userId }, function (err, user) {
      if (err) res.json(err);
      if (req.file) {
        user.imagePath = req.file.path.slice(15);
      }
      if (req.body.name) {
        user.name = req.body.name;
      }
      if (req.body.email) {
        user.email = req.body.email;
      }
      if (req.body.password) {
        user.password = req.body.password;
      }

      if (req.body.isAdmin) {
        user.isAdmin = req.body.isAdmin;
      }
      user.save(function (err, user) {
        if (err) return res.json(err);
        res.json(user);
      });
    });
  },

  getUsers: function (req, res, next) {
    User.find({}, function (err, users) {
      if (err) {
        console.log(err);
      }
      res.json(users);
    });
  },

  login: function (req, res, next) {
    User.findOne({ email: req.body.email }, function (err, user) {
      if (err) res.json(err);
      jwt.sign({ user }, 'secretkey', { expiresIn: '24h' }, (err, token) => {
        res.json({
          token
        });
      });
    });




  },
  postProfile: function (req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        if (authData.user.isAdmin) {
          User.find({}, function (err, users) {
            if (err) {
              console.log(err);
            }
            res.json({
              message: 'You are admin...',
              users
            });
          });
        }
        else {
          res.json({
            message: 'You are user...',
            authData
          });
        }

      }
    });
  },
  registration: function (req, res, next) {
    User.findOne({ email: req.body.email }, function (err, user) {
      if (err) res.json(err);
      if (user === null) {
        var user = {
          _id: new mongoose.Types.ObjectId(),
          email: req.body.email,
          password: req.body.password,
          name: req.body.name
        };
        var newUser = new User(user);
        newUser.save(function (err, user) {
          res.json(user);
        });
      } else {
        res.json('User with this email already exists');
      }
    });
  },
  deleteUser: function (req, res, next) {
    User.findOne({ email: req.body.email }, function (err, user) {
      user.remove(function (err, user) {
        res.json('User succesfully deleted');
      });
    });
  }
};

