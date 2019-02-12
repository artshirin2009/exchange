var User = require('../../models/user');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt')
var path = require('path');
/**find modules */
var userFind = require('../../config/find-users')

// module.exports = {
//   /**Start test route (GET) */
//   chat: function (req, res, next) {
    
//     res.sendFile('public/index.html'));
//     console.log('there');
//     next();
//   },
// }