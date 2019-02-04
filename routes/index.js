var express = require('express');
var router = express.Router();
var validateUser = require('../config/validateuser');
var mongoose = require('mongoose');
var multerUpload = require('../config/file-upload');
var routes = require('./routes');

/**Profile page + uploading images */
router.post('/updateUser', multerUpload.single('imageFile'), routes.updateUser);
/* GET users. */
router.get('/', validateUser, routes.getUsers);
/**Profile page + uploading images */
router.get('/profile/:id', validateUser, routes.getProfile);
/**Registration */
router.post('/registration', routes.registration);
/**Login page */
router.post('/login', routes.login);

module.exports = router;
