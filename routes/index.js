var express = require('express');
var router = express.Router();
var validateUser = require('../config/validateuser');
var mongoose = require('mongoose');
var multerUpload = require('../config/file-upload');
var checkingIsAdmin = require('../config/chekingIsAdmin');

var routes = require('./routes');


/* GET users. */
router.get('/', validateUser, routes.getUsers);


/**Profile page + uploading images */
router.get('/profile/:id', validateUser,checkingIsAdmin, routes.getProfile);
/**Profile page + uploading images */
router.post('/updateUser', multerUpload.single('imageFile'), routes.updateUser);


/**Registration */
router.post('/registration', routes.registration);
/**Login page */
router.post('/login', routes.login);
router.post('/delete', routes.deleteUser);
router.get('/users', routes.getUsers);

router.post('/profileTest', routes.profileTest);

module.exports = router; 
