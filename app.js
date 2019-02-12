
var express = require('express');
var path = require('path');

var cors = require('cors')

var dotenv = require('dotenv').config();
var jwt = require('jsonwebtoken');
var verifyToken = require(__dirname + '/config/verifyToken');
var userRouter = require('./routes/user/user');
var userPosts = require('./routes/post/post');
var userComments = require('./routes/comment/comment');
//var chatRoutes = require('./routes/chat/chat');

require('./config/database');

var app = express();

app.set('secretKey', 'nodeRestApi'); // jwt secret token
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));


app.use('/', userPosts);
app.use('/', userRouter);
app.use('/', userComments);
//app.use('/', chatRoutes);

var http = require('http').Server(app);

/**Socket io */
var io = require('socket.io')(http);

app.get('/chat',
    //verifyToken,
    function (req, res, next) {
        res.sendFile(__dirname + '/index.html');
    });

/**Socket listening */
io.on('connection', function (socket) {
    console.log('client connected');


    socket.on('send user', function (msg) {
        io.emit('new message', msg);
    });

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });


});

http.listen(4000, function () {
    console.log('listening on *:4000');
});
