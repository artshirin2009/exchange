const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const jwt = require('jsonwebtoken');

var Schema = mongoose.Schema;

var userSchema = new Schema({
  imagePath: {
    type: String 
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  isAdmin: {
    type: Boolean,
    required:true,
    default: 0
  }
});

userSchema.methods.toJSON = function() {
  var obj = this.toObject();
  delete obj.password;
  return obj;
 }


// hash user password before saving into database
// userSchema.pre('save', function(next) {
//   this.password = bcrypt.hashSync(this.password, saltRounds);
//   next();
// });

module.exports = mongoose.model('User', userSchema);
