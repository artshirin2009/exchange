module.exports = function (req, res, next) {
    if (req.user) {
        if (req.user.isAdmin) {
            return next();
        }
    }
    res.json('Only for admin')
}