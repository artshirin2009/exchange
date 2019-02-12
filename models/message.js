const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const messageSchema = new Schema({
    author: {
        type: String,
    },
    text: {
        type: String
    },
    date: Date
});

module.exports = mongoose.model('Message', messageSchema);
