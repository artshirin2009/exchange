var User = require('../models/users');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt')

module.exports = {
  /**Registration users (POST)*/
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
  /**Login users (POST)*/
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
  /**User profile (GET)*/
  getProfile: function (req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        res.json(authData.user)
      }
    });
  },
  /**Update profile (+images) (POST)*/
  updateProfile: function (req, res, next) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        var userId = authData.user._id;
        User.findOne({ _id: userId }, function (err, user) {
          console.log(user)
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
          user.save(function (err, user) {
            if (err) return res.json(err);
            res.json(user);
          });
        });
      }
    })
  },
  /**Get profile all users (only if isAdmin:true) */
  getAllUsers: function (req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        console.log(authData)
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
          res.sendStatus(401).send("Sorry! You can't see that.");
        }

      }
    });
  },
  // /**Delete user */
  // deleteUser: function (req, res, next) {
  //   User.findOne({ email: req.body.email }, function (err, user) {
  //     user.remove(function (err, user) {
  //       res.json('User succesfully deleted');
  //     });
  //   });
  // }
};

