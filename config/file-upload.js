var multer = require('multer');
const storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, './public/uploads/');
  },
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname.toString().slice(-4));
  }
});

module.exports = multer({ storage: storage });
