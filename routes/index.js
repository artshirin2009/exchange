var express = require('express');
var router = express.Router();
var validateUser = require('../config/validateuser');
var verifyToken = require('../config/verifyToken');
var mongoose = require('mongoose');
var multerUpload = require('../config/file-upload');
var checkingIsAdmin = require('../config/chekingIsAdmin');
var bcrypt = require('bcrypt')
var routes = require('./routes');

/* GET users. */
router.get('/', validateUser, routes.getUsers);

/**Profile page + uploading images */
router.get('/profile/:id', validateUser, checkingIsAdmin, routes.getProfile);
/**Profile page + uploading images */
router.post('/updateUser', multerUpload.single('imageFile'), routes.updateUser);
/**Registration */
router.post('/registration', routes.registration);
/**Login page */
router.post('/login', routes.login);
router.post('/delete', routes.deleteUser);
router.get('/users', routes.getUsers);

/**New routes */
router.post('/profile/user', verifyToken, routes.postProfile);


/**Test routes */
router.get('/get-profile/user', verifyToken, routes.postProfile);
module.exports = router;


// bcrypt.compare(req.body.password, 10, function (err, res) {
//     console.log(res)
//     if (res) {
//       next()
//     } else {
//       res.json(err)
//     }
//   })