var app = require('express')();
var http = require('http').Server(app);
var express = require('express');
var path = require('path');

// 加载socket.io, 并且new一个instance
var io = require('socket.io')(http);

/*
app.get('/', function(req, res){
  res.send('<h1>Hello world</h1>');
});
*/

app.use(express.static(path.join(__dirname, 'public')));

// 改为发送一个html file
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

/*
io.on('connection', function(socket){
  console.log('a user connected');
});
*/
/*
io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});
*/
/*
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
});
*/

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('chat message: ' + msg);
    io.emit('chat message', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
