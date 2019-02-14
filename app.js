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


var Message = require(__dirname + '/models/message');
var User = require(__dirname + '/models/user');
var history = [];
var connectedUsers = [];

app.get('/chat',
    //verifyToken,
    function (req, res, next) {
        Message.find().populate('author')
            .limit(10)
            .sort('-createDate')
            .exec(function (err, data) {
                if (err) { res.status(400).json(err) }
                var result = data.map(elem => item = {
                    name: elem.author.name,
                    avatar: elem.author.imagePath,
                    message: elem.message
                })
                history = result;
                res.json(result)
            })
    });
app.get('/mychat',
    //verifyToken,
    function (req, res, next) {
        Message.find().populate('author')
            .limit(5)
            .exec(function (err, data) {
                if (err) { res.status(400).json(err) }
                var result = data.map(elem => item = {
                    name: elem.author.name,
                    avatar: elem.author.imagePath,
                    message: elem.message
                })
                history = result;
                res.sendFile(__dirname + '/index.html')
                //res.json(lastTenMessages)
            })

    });

// app.get('/mychat-2',
//     //verifyToken,
//     function (req, res, next) {
//         Message.find().populate('author')
//             .limit(5)
//             .exec(function (err, data) {
//                 if (err) { res.status(400).json(err) }
//                 var result = data.map(elem => item = {
//                     name: elem.author.name,
//                     avatar: elem.author.imagePath,
//                     message: elem.message
//                 })
//                 history = result;
//                 res.sendFile(__dirname + '/index-2.html')
//                 //res.json(lastTenMessages)
//             })

//     });

let numUsers = 0;
/**Socket listening */
io.on('connection', function (socket) {


    

    // console.log('client connected');
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
            connectedUsers.push(userObj)
            console.log(connectedUsers)
            socket.emit('username-result', connectedUsers)
            // if (connectedUsers.length <= 0) {
            //     connectedUsers.push(userObj)
            //     console.log('connected users - ')
            //     console.log(connectedUsers)
                
            // }
            
            var findArr = connectedUsers.find(item => item.name === userObj.name)
            if (!findArr) { connectedUsers.push(userObj) 
                socket.emit('username-result', connectedUsers)
            }
            
            

            
        })
        // setTimeout(() => {
        //     socket.broadcast.emit('username-result', connectedUsers)
        // }, 2000);

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
                    message: msg.message
                };
                io.emit('new message', dataToSend);
            })

        });
        once = true;
    }
    socket.on('disconnect', function () {
        var index = connectedUsers.findIndex(function(o){
            if(socket.userObj){
               return o.id === socket.userObj.id; 
            }
             else return 0
        })
        if (index !== -1) connectedUsers.splice(index, 1);

        // echo globally that this client has left
        socket.broadcast.emit('user left', connectedUsers);

        // socket.userObj - User to delete
        // connectedUsers - Online users

        // console.log(socket.userObj)


        




        console.log(connectedUsers)

        console.log('user disconnected');
        console.log(' ');
        --numUsers;
        console.log(`${numUsers} users connected at this moment.`)
    });


});


http.listen(4000, function () {
    console.log('listening on *:4000');
});
