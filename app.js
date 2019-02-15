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

var server = require('http').createServer(app); /**2 */

/**Socket io */
var io = require('socket.io')(server); 
var chat = require('./config/chat')
io.on('connection',chat);


server.listen(4000, function () {
    console.log('listening on *:4000');
});
