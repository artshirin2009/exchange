var express = require('express');
var router = express.Router();
var User = require('../../models/users');

var jwt = require('jsonwebtoken');
var multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './public/uploads/');
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname.toString().slice(-4));
  }
});
var upload = multer({ storage: storage });
var mongoose = require('mongoose');

/**Profile page + uploading images */
router.get('/profile/:id', validateUser, function (req, res, next) {
  console.log('profile')
  var userId = req.params.id;
  User.findOne({ _id: userId }, function (err, obj) {
    if (err) res.json(err);
    res.json(obj)
  })
})

/**Profile page + uploading images */
router.post(
  '/updateUser',
  upload.single('imageFile'),
  function (req, res, next) {
    var userEmail = req.body.email;
    User.find(userEmail, function (err, user) {
      if (req.file) {
        user.imagePath = req.file.path;
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
);

function validateUser(req, res, next) {
  jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function (err, decoded) {
    console.log(req.headers['x-access-token'])
    if (err) {
      res.json({ status: "error", message: err.message, data: null });
    } else {
      // add user id to request
      req.body.userId = decoded.id;
      next();
    }
  })
}

module.exports = router;