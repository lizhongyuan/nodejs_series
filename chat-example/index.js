var app = require('express')();
var http = require('http').Server(app);

// 加载socket.io, 并且new一个instance
var io = require('socket.io')(http);

/*
app.get('/', function(req, res){
  res.send('<h1>Hello world</h1>');
});
*/

// 改为发送一个html file
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

/*
io.on('connection', function(socket){
  console.log('a user connected');
});
*/
io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
