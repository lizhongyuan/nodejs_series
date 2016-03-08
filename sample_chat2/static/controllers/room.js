angular.module('techNodeApp').controller('RoomCtrl', ["$scope", "socketService", function($scope, socketService) {
    $scope.messages = []
    console.log("try to getAllMessages.");
    socketService.emit('getAllMessages')
    socketService.on('allMessage', function (messages) {
        console.log("Client get all messages.");
        $scope.messages = messages
    })
    socketService.on('messageAdded', function (message) {
        $scope.messages.push(message)
    })
}])