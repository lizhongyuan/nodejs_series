/**
 * Created by svenlee on 16/2/12.
 */
module.exports = function(io) {
    var messages = []

    io.sockets.on('connection', function (socket) {
        socket.on('getAllMessages', function () {
            console.log("Server receive getAllMessages.");
            console.log("Server emit allMessages.");
            socket.emit('allMessages', messages)
        })
        socket.on('createMessage', function (message) {
            //
            messages.push(message);
            console.log("Server receive createMessage.");
            console.log("Server emit messageAdded.");
            //io.sockets.emit('messageAdded', message)
            socket.emit('messageAdded', message)
        })
    })
}
