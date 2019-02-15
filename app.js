/**https://gitlab.com/saidmkh/cube-test.git */
var express = require('express');
var path = require('path');

var cors = require('cors')

var dotenv = require('dotenv').config();
var jwt = require('jsonwebtoken');
var verifyToken = require(__dirname + '/config/verifyToken');
var userRouter = require('./routes/user/user');
var userPosts = require('./routes/post/post');
var userComments = require('./routes/comment/comment');
var chatRoutes = require('./routes/chat/chat');

require('./config/database');

var app = express();  /**1 */

app.set('secretKey', 'nodeRestApi'); // jwt secret token
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));


app.use('/', userPosts);
app.use('/', userRouter);
app.use('/', userComments);
app.use('/', chatRoutes);

var http = require('http').Server(app); /**2 */



/**Socket io */
var io = require('socket.io')(http); /*3*/
var Message = require(__dirname + '/models/message');
var User = require(__dirname + '/models/user');
var history = [];
var connectedUsers = [];
/**Socket listening */
let numUsers = 0;

//require('./config/socket');
io.on('connection', function (socket) {
    ++numUsers;
    console.log(`${numUsers} users connected at this moment.`)
    socket.on('username', function (userId) {

        User.findOne({ _id: userId }, function (err, user) {
            var userObj = {
                id: user._id,
                name: user.name,
                avatar: user.imagePath
            }
            socket.userObj = userObj;
            if (connectedUsers.length <= 0) {
                connectedUsers.push(userObj)
                socket.emit('username-result', connectedUsers)
            }
            var findArr = connectedUsers.find(item => item.id === userObj.id)
            if (!findArr) {
                connectedUsers.push(userObj)
                socket.emit('username-result', connectedUsers)
            }

            socket.emit('username-result', connectedUsers);
            socket.broadcast.emit('username-result', connectedUsers)
        })
    });

    var once = false;
    if (!once) {
        history.forEach(element => {
            socket.emit('history', element)
        });
        socket.on('send-from-user', function (msg) {
            if (!typeof msg === Object) {
                res.sendStatus(403)
            }
            var newMessage = new Message();
            newMessage.message = msg.message;
            newMessage.author = msg.userId;
            newMessage.createDate = Date.now();
            newMessage.save();
            let mesNumUsers = `${numUsers} users connected at this moment.`
            User.findOne({ _id: msg.userId }, function (err, user) {
                if (err) {
                    res.sendStatus(403).json(err)
                }
                var dataToSend;
                var dataToSend = {
                    name: user.name,
                    avatar: user.imagePath,
                    message: msg.message,
                    created: newMessage.createDate
                };
                io.emit('new message', dataToSend);
            })
        });
        once = true;
    }
    socket.on('disconnect', function () {
        var index = connectedUsers.findIndex(function (o) {
            if (socket.userObj) {
                return o.id === socket.userObj.id;
            }
            else return 0
        })
        if (index !== -1) connectedUsers.splice(index, 1);

        socket.broadcast.emit('user left', connectedUsers);
        console.log('user disconnected');
        console.log(' ');
        --numUsers;
        console.log(`${numUsers} users connected at this moment.`)
    });
});


http.listen(4000, function () {
    console.log('listening on *:4000');
});
