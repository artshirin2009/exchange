var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

//var bcrypt = require('bcrypt')
var routes = require('./dataRoutes');



/**Empty route */
router.get('/', routes.start);


router.get('/data', routes.data);


//router.get('/data-create', routes.create);
// /**Registration */
// router.post('/registration', routes.registration);

// /**Login page */
// router.post('/login', routes.login);

// /**Get profile page */
// router.get('/user/:userId', verifyToken, routes.getProfile);

// /**Update profile (+images) */
// router.put('/user/:userId',
//     verifyToken,
//     routes.updateProfile);

// /**Get profile all users (only if isAdmin:true) */
// router.get('/admin/users', verifyToken, routes.getAllUsers);
// /**Delete user */
// router.delete('/user/:userId', verifyToken, routes.deleteUser);


module.exports = router;
