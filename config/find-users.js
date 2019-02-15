var jwt = require('jsonwebtoken');
userFind =
    function (req, res, User, userId, authData) {
        User.findById({ _id: userId }, function (err, user) {
            if (authData.user.isAdmin) {
                if (req.body.isAdmin) { user.isAdmin = req.body.isAdmin; }
            }
            if (req.file) { user.imagePath = req.file.path.slice(15) }
            if (req.body.email) { user.email = req.body.email; console.log('email'+req.body.email)}
            if (req.body.name) { user.name = req.body.name; console.log('name' + req.body.name) };
            // if (req.body.password) { user.password = req.body.password; console.log('pass' + req.body.password)}
            user.save(function (err, user) {
                if (err) return res.json(err);

                console.log('user info')
                console.log(user)


                jwt.sign({ user }, 'secretkey', { expiresIn: '24h' }, (err, token) => {
                    authData.user.isAdmin ? user.role = 'admin' : user.role = 'user'
                    res.json([`User updated by ${user.role}`, user, token]);
                });
            })
        })
    }
module.exports = userFind;