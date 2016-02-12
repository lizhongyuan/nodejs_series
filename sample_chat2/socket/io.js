/**
 * Created by svenlee on 16/2/12.
 */

var messages = [];

io.sockets.on("connection", function(socket){
    socket.on("getAllMessages", function(){
        // 将所有消息推送到客户端
        socket.emit("allMessages", messages);
    });

    socket.on("createMessage", function(message){
        messages.push(message);
        socket.emit("messageAdded", message);
    });
});
