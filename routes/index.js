var express = require('express');
var router = express.Router();
var User = require('../models/users');

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
router.get('/profile/:id', function (req, res, next) {
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


/* GET user. */
router.get('/', validateUser, function (req, res, next) {
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
    console.log('login')
    User.findOne({ _id: req.body.userId }, function (err, obj) {
      if (err) res.json(err);
      // res.json(obj);
      const token = jwt.sign({ id: obj._id }, req.app.get('secretKey'), { expiresIn: '1h' });
      res.json(
        { status: "success", message: "user found!!!", data: { user: obj, token: token } }
      );
    })
  });


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