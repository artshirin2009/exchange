// var express = require('express');
// var app = express();  /**1 */
// var http = require('http').Server(app); /**2 */
/**Socket io */
// var io = require('socket.io')(http); /*3*/
// var Message = require('../models/message');
// var User = require('../models/user');
// var history = [];
// var connectedUsers = [];
/**Socket listening */
// let numUsers = 0;

// module.exports =  function (socket) {
//     ++numUsers;
//     console.log(`${numUsers} users connected at this moment.`)
//     socket.on('username', function (userId) {

//         User.findOne({ _id: userId }, function (err, user) {
//             var userObj = {
//                 id: user._id,
//                 name: user.name,
//                 avatar: user.imagePath
//             }
//             socket.userObj = userObj;
//             if (connectedUsers.length <= 0) {
//                 connectedUsers.push(userObj)
//                 socket.emit('username-result', connectedUsers)
//             }
//             var findArr = connectedUsers.find(item => item.name === userObj.name)
//             if (!findArr) {
//                 connectedUsers.push(userObj)
//                 socket.emit('username-result', connectedUsers)
//             }

//             socket.emit('username-result', connectedUsers);
//             socket.broadcast.emit('username-result', connectedUsers)
//         })
//     });

//     var once = false;
//     if (!once) {
//         history.forEach(element => {
//             socket.emit('history', element)
//         });
//         socket.on('send-from-user', function (msg) {
//             if (!typeof msg === Object) {
//                 res.sendStatus(403)
//             }
//             var newMessage = new Message();
//             newMessage.message = msg.message;
//             newMessage.author = msg.userId;
//             newMessage.createDate = Date.now();
//             newMessage.save();
//             let mesNumUsers = `${numUsers} users connected at this moment.`
//             User.findOne({ _id: msg.userId }, function (err, user) {
//                 if (err) {
//                     res.sendStatus(403).json(err)
//                 }
//                 var dataToSend;
//                 var dataToSend = {
//                     name: user.name,
//                     avatar: user.imagePath,
//                     message: msg.message,
//                     created: newMessage.createDate
//                 };
//                 io.emit('new message', dataToSend);
//             })
//         });
//         once = true;
//     }
//     socket.on('disconnect', function () {
//         var index = connectedUsers.findIndex(function (o) {
//             if (socket.userObj) {
//                 return o.id === socket.userObj.id;
//             }
//             else return 0
//         })
//         if (index !== -1) connectedUsers.splice(index, 1);

//         socket.broadcast.emit('user left', connectedUsers);
//         console.log('user disconnected');
//         console.log(' ');
//         --numUsers;
//         console.log(`${numUsers} users connected at this moment.`)
//     });
// }