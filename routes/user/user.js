var express = require('express');
var router = express.Router();
var verifyToken = require('../../config/verifyToken');
var mongoose = require('mongoose');
var multerUpload = require('../../config/file-upload');
//var bcrypt = require('bcrypt')
var routes = require('./userRoutes');



/**Empty route */
router.get('/', routes.start);

/**Registration */
router.post('/registration', routes.registration);

/**Login page */
router.post('/login', routes.login);

/**Get profile page */
router.get('/user/:userId', verifyToken, routes.getProfile);

/**Update profile (+images) */
router.put('/user/:userId',
    verifyToken,
    multerUpload.single('imageFile'),
    routes.updateProfile);

/**Get profile all users (only if isAdmin:true) */
router.get('/admin/users', verifyToken, routes.getAllUsers);
/**Delete user */
router.delete('/user/:userId', verifyToken, routes.deleteUser);


module.exports = router;
