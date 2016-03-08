angular.module('techNodeApp').controller('MessageCreatorCtrl', ["$scope", "socketService", function($scope, socketService) {
    $scope.newMessage = ''
    $scope.createMessage = function () {
        if ($scope.newMessage == '') {
            return
        }
        socketService.emit('createMessage', $scope.newMessage)
        $scope.newMessage = ''
    }
}])