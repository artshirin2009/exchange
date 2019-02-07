var User = require('../../models/user');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt')

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
      var comparePass = bcrypt.compareSync(req.body.password, user.password)
      if (comparePass) {
        if (err) { res.json(err) };
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
    });
  },
  /**User profile (GET)*/
  getProfile: function (req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
      if (err) { res.sendStatus(403) }
      var id = req.params.userId
      console.log(id)
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
        console.log(authData.user.isAdmin)
        if (authData.user.isAdmin) {
          User.findById({ _id: userId }, function (err, user) {
            if (req.file) { user.imagePath = req.file.path.slice(15) }
            if (req.body.name) { user.name = req.body.name; }
            if (req.body.email) { user.email = req.body.email; }
            if (req.body.password) { user.password = req.body.password; };

            user.save(function (err, user) {
              if (err) return res.json(err);
              jwt.sign({ user }, 'secretkey', { expiresIn: '24h' }, (err, token) => {
                res.json(['User updated by admin', user, token]);
              });
            })
          })
        }
        else if (!authData.user.isAdmin) {
          if (userId === authData.user._id) {
            User.findById({ _id: userId }, function (err, user) {
              if (req.file) { user.imagePath = req.file.path.slice(15) }
              if (req.body.email) { user.email = req.body.email; }
              if (req.body.name) { user.name = req.body.name; };
              if (req.body.password) { user.password = req.body.password; };
              console.log(req.body.password)
              user.save(function (err, user) {
                if (err) return res.json(err);
                jwt.sign({ user }, 'secretkey', { expiresIn: '24h' }, (err, token) => {
                  res.json(['User updated by user', user, token]);
                });
              })
            })
          }
          else { res.json('You can edit only your account') }
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
          User.deleteOne({ _id: userId }, function (err, doc) { res.json('User deleted by admin') })
        }
        else {
          var userId = req.params.userId;
          User.findById({ _id: userId }, function (err, user) {
            if (err) res.json(err);
            if (user._id == authData.user._id) {
              user.remove(function (err, user) {
                if (err) return res.json(err);
                res.json('User successfully deleted');
              });
            }
            else { res.json('You can delete only your account') }
          })
        }
      }
    });
  }
};

