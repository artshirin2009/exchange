var express = require('express');
var router = express.Router();
var routes = require('./chatRoutes');

/**Chat route */
router.get('/chat', routes.chat);

module.exports = router;
