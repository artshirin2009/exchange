var jwt = require('jsonwebtoken');
module.exports = function(req, res, next) {
  jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function(
    err,
    decoded
  ) {
    console.log(req.headers['x-access-token']);
    if (err) {
      res.json({ status: 'error', message: err.message, data: null });
    } else {
      // add user id to request
      req.body.userId = decoded.id;
      next();
    }
  });
};
