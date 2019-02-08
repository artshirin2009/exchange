var jwt=require('jsonwebtoken');
userFind =
    function (req, res, User, userId,authData) {
        User.findById({ _id: userId }, function (err, user) {
            console.log(authData.user)
            if(authData.user.isAdmin){
                user.isAdmin = req.body.isAdmin;
                user.password = req.body.password
            }
            if (req.file) { user.imagePath = req.file.path.slice(15) }
            if (req.body.email) { user.email = req.body.email; }
            if (req.body.name) { user.name = req.body.name; };
            user.save(function (err, user) {
                if (err) return res.json(err);
                jwt.sign({ user }, 'secretkey', { expiresIn: '24h' }, (err, token) => {
                    authData.user.isAdmin? user.role = 'admin' : user.role='user'
                    res.json([`User updated by ${user.role}`, user, token]);
                });
            })
        })
    }
    module.exports=userFind