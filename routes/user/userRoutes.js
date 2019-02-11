var User = require('../../models/user');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt')

/**find modules */
var userFind = require('../../config/find-users')

module.exports = {
  /**Start test route (GET) */
  start: function (req, res, next) {
    res.json('Hi')
  },
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
      if (user != undefined) {
        
        var comparePass = bcrypt.compareSync(req.body.password, user.password)
        if (comparePass) { 
          jwt.sign({ user }, 'secretkey', { expiresIn: '24h' }, (err, token) => {
            
            res.json({
              user,
              token
            });
          });
        }
        else {
          
          res.sendStatus(403);
        }
      }
      else {
        
        res.json(err)
      }
    });
  },
  /**User profile (GET)*/
  getProfile: function (req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
      if (err) { res.sendStatus(403) }
      var id = req.params.userId
      User.findById(id, (err, user) => {
        res.json(user)
      })
    });
  },
  /**Update profile (+images) (PUT)*/
  updateProfile: function (req, res, next) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        var userId = req.params.userId;
        if (authData.user.isAdmin) {
          userFind(req, res, User, userId, authData);
        }
        else if (!authData.user.isAdmin) {
          if (userId === authData.user._id) {
            userFind(req, res, User, userId, authData);
          }
          else { res.status(403).json('You can edit only your account') }
        }
      }
    })
  },
  /**Get profile all users (only if isAdmin:true) (GET)*/
  getAllUsers: function (req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        if (authData.user.isAdmin) {
          User.find({}, function (err, users) {
            res.json({
              message: 'You are admin...',
              users
            });
          });
        }
        else {
          res.sendStatus(401)
        }
      }
    });
  },
  /**Delete user */
  deleteUser: function (req, res, next) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        if (authData.user.isAdmin) {
          var userId = req.params.userId;
          User.deleteOne({ _id: userId }, function (err, doc) { res.json({message:'User deleted by admin'}) })
        }
        else {
          var userId = req.params.userId;
          User.findById({ _id: userId }, function (err, user) {
            if (err) res.json(err);
            if (user._id == authData.user._id) {
              user.remove(function (err, user) {
                if (err) return res.json(err);
                res.json({message:'User successfully deleted'});
              });
            }
            else {res.status(403).json('You can delete only your account') }
          })
        }
      }
    });
  }
};