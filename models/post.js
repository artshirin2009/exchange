const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  image:{
    type:String,
    required:false
  },
  title: {
    type: String,
    required:true
  },
  description: {
    type:String,
    required: true
  },
  created_user:{
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Post', userSchema);
