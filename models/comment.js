const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    postId: {
        type: String,
        required: true 
    },
    body: {
        type: String,
        required: true
    },
    created_user: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Comment', userSchema);
