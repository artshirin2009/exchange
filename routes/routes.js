var User = require('../models/users');
var jwt = require('jsonwebtoken');

module.exports = {
  updateUser: function(req, res, next) {
    var userId = req.body.id;
    User.findOne({ _id: userId }, function(err, user) {
      if (err) res.json(err);
      if (req.file) {
        user.imagePath = req.file.path.slice(7);
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
      user.save(function(err, user) {
        if (err) return res.json(err);
        res.json(user);
      });
    });
  },
  getUsers: function(req, res, next) {
    User.find({}, function(err, users) {
      if (err) {
        console.log(err);
      }
      res.json(users);
    });
  },
  getProfile: function(req, res, next) {
    var userId = req.params.id;
    User.findOne({ _id: userId }, function(err, obj) {
      if (err) res.json(err);
      res.json(obj);
    });
  },
  login: function(req, res, next) {
    User.findOne({ email: req.body.email }, function(err, user) {
      if (err) res.json(err);
      const token = jwt.sign({ email: user.email }, req.app.get('secretKey'), {
        expiresIn: '1h'
      });
      res.json({
        status: 'success',
        message: 'user found!!!',
        data: { user: user, token: token }
      });
    });
  },
  registration: function(req, res, next) {
    var user = {
      _id: new mongoose.Types.ObjectId(),
      email: req.body.email,
      password: req.body.password
    };

    var newUser = new User(user);
    newUser.save(function(err, user) {
      res.json(user);
    });
  }
};
