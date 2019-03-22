/**https://gitlab.com/saidmkh/cube-test.git */
var express = require('express');
var path = require('path');


var dotenv = require('dotenv').config();

var dataRouter = require('./routes/data/data');

require('./config/database');

var app = express();  /**1 */

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/', dataRouter);

var server = require('http').Server(app); 

server.listen(4000, function () {
    console.log('listening on *:4000');
});
