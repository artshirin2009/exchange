const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: true
  },
  created_user: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Post', userSchema);
