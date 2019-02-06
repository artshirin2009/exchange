var express = require('express');
var router = express.Router();
var verifyToken = require('../config/verifyToken');
var mongoose = require('mongoose');
var multerUpload = require('../config/file-upload');
//var bcrypt = require('bcrypt')
var routes = require('./routes');



/**Registration */
router.get('/', routes.start);

/**Registration */
router.post('/registration', routes.registration);

/**Login page */
router.post('/login', routes.login);

/**Get profile page */
router.get('/get-profile', verifyToken, routes.getProfile);

/**Update profile (+images) */
router.post('/update-profile',
    verifyToken,
    multerUpload.single('imageFile'),
    routes.updateProfile);

/**Update profile (+images) */
router.post('/update-profiles',
    verifyToken,
    multerUpload.single('imageFile'),
    routes.updateProfilesForAdmin);

/**Get profile all users (only if isAdmin:true) */
router.get('/all-users', verifyToken, routes.getAllUsers);
/**Delete user */
router.post('/delete', verifyToken, routes.deleteUser);




module.exports = router;


// bcrypt.compare(req.body.password, 10, function (err, res) {
//     console.log(res)
//     if (res) {
//       next()
//     } else {
//       res.json(err)
//     }
//   })