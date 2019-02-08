const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const commentSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },
    content: {
        type: String
    }
});

module.exports = mongoose.model('Comment', commentSchema);
