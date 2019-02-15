
var Message = require('../../models/message');

module.exports = {
  chat: function (req, res, next) {
    Message.find().populate('author')
        .limit(10)
        .sort('-createDate')
        .exec(function (err, data) {
            if (err) { res.status(400).json(err) }
            var result = data.map(elem => item = {
                name: elem.author.name,
                avatar: elem.author.imagePath,
                message: elem.message,
                created: elem.createDate
            })
            history = result;
            res.json(result)
        })
}
}