
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

var history;

app.get('/chat',
    //verifyToken,
    function (req, res, next) {
        Message.find().populate('author')
        .limit(1)
        // .sort('data')
        .exec(function (err, data) {
           
           var  messages;
           console.log(data)
            // lastTenMessages.forEach(element => {
            //     messages.message = element.message;
            //     messages.name = element.author;
            //     //mess
            // });

            // res.sendFile(__dirname + '/index.html')
            res.json(data[0].author.name + data[0].author.imagePath)

        })
    }); 
app.get('/mychat',
    //verifyToken,
    function (req, res, next) {
        Message.find().limit(5).exec(function (err, lastTenMessages) {
            history = lastTenMessages;
            res.sendFile(__dirname + '/index.html')
            //res.json(lastTenMessages)
        })
        
    });

let numUsers = 0;
/**Socket listening */
io.on('connection', function (socket) {
    console.log('client connected');
    ++numUsers;
    console.log(`${numUsers} users connected at this moment.`)  
    var once = false;
    if (!once) {
        // history.forEach(element => {
        //     socket.emit('history', element)
        // });
        socket.on('send-from-user', function (msg) {
            if(!typeof msg === Object){
                res.sendStatus(403)
            }
            var newMessage = new Message();
            newMessage.text = msg.message;
            newMessage.author = msg.userId;
            newMessage.createDate = Date.now();
            newMessage.save();
            let mesNumUsers = `${numUsers} users connected at this moment.`
            User.findOne({ _id: msg.userId }, function (err, user) {
                if(err){
                    res.sendStatus(403).json(err)
                }
                var dataToSend;
                
                var dataToSend = {
                    name: user.name,
                    avatar: user.imagePath,
                    message: msg.message
                };
                console.log('Data to send - ')
                console.log(dataToSend)
               io.emit('new message', dataToSend);
            })
            
        });
        once = true;
    }
    socket.on('disconnect', function () {
        console.log('user disconnected');
        console.log(' ');
        --numUsers;
        console.log(`${numUsers} users connected at this moment.`)
    });
});


http.listen(4000, function () {
    console.log('listening on *:4000');
});
