
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
var history;


app.get('/chat',
    //verifyToken,
    function (req, res, next) {
        Message.find().limit(10).sort('-date').exec(function (err, lastTenMessages) {
            history = lastTenMessages;
            console.log(history)
            
            setTimeout(function(){
                res.json(lastTenMessages)
            },1000)
          //res.sendFile(__dirname + '/index.html');




          
    // let promise = new Promise((resolve, reject) => {
    
    //   setTimeout(() => {
    //     // переведёт промис в состояние fulfilled с результатом "result"
    //     resolve("result");
    //   }, 1000);
    
    // });
    
    // // promise.then навешивает обработчики на успешный результат или ошибку
    // promise
    //   .then(
    //     result => {
    //       // первая функция-обработчик - запустится при вызове resolve
    //       alert("Fulfilled: " + result); // result - аргумент resolve
    //     },
    //     error => {
    //       // вторая функция - запустится при вызове reject
    //       alert("Rejected: " + error); // error - аргумент reject
    //     }
    //   );










        })


    });



/**Socket listening */
io.on('connection', function (socket) {
    console.log('client connected');
    var once = false;
    if (!once) {
        history.forEach(element => {
            socket.emit('history', element)
        });
        once = true;
    }
    socket.on('send user', function (msg) {
        console.log(msg)
        var newMessage = new Message();
        newMessage.text = msg;
        newMessage.date = Date.now();
        newMessage.save();
        io.emit('new message', msg);
    });

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });


});



http.listen(4000, function () {
    console.log('listening on *:4000');
});
