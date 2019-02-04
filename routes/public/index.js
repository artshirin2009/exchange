var express = require('express');
var router = express.Router();
var User = require('../../models/users');
var multer = require('multer');

var jwt = require('jsonwebtoken');

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

/* GET user. */
router.get('/',function (req, res, next) {
  console.log('/')
  User.find({}, function (err, users) {
    if (err) {
      console.log(err);
    }
    res.json(users)
  });
});

/**Registration */
router.post(
  '/registration',
  function (req, res, next) {
    var user = {
      _id: new mongoose.Types.ObjectId(),
      email: req.body.email,
      password: req.body.password
    };
    
    var newUser = new User(user);
    newUser.save(function (err, user) {
      res.json(user)
    });
  });

/**Login page */
router.post(
  '/login',
  function (req, res, next) {
    User.findOne({ _id: req.body.userId }, function (err, obj) {
      if (err) res.json(err);
      const token = jwt.sign({ id: obj._id }, req.app.get('secretKey'), { expiresIn: '1h' });
      res.json(
        { status: "success", message: "user found!!!", data: { user: obj, token: token } }
      );
    })
  });






module.exports = router;