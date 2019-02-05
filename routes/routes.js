var User = require('../models/users');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose')

module.exports = {
  updateUser: function (req, res, next) {
    var userId = req.body.id;
    User.findOne({ _id: userId }, function (err, user) {
      if (err) res.json(err);
      if (req.file) {
        user.imagePath = req.file.path.slice(15);
        console.log(user.imagePath)
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
  },
  getUsers: function (req, res, next) {
    User.find({}, function (err, users) {
      if (err) {
        console.log(err);
      }
      res.json(users);
    });
  },
  getProfile: function (req, res, next) {
    var userId = req.params.id;
    User.findOne({ _id: userId }, function (err, obj) {
      if (err) res.json(err);
      res.json(obj);
    });
  },
  login: function (req, res, next) {
    User.findOne({ email: req.body.email }, function (err, user) {
      if (err) res.json(err);
      const token = jwt.sign({ email: user.email }, req.app.get('secretKey'), {
        expiresIn: '24h'
      });
      res.json({
        status: 'success',
        message: 'user found!!!',
        token
      });
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
        })
      }
      else {
        res.json('User with this email already exists')
      }
    }
    );
  },
  deleteUser: function(req, res, next){
    User.findOne({email: req.body.email}, function(err, user){
      user.remove(function (err, user) {
        res.json('User succesfully deleted');
      });
    })
  }
  
};
