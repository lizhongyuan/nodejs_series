angular.module('techNodeApp', [])

angular.module('techNodeApp').factory('socketService', ["$rootScope", function($rootScope) {
    //为了避免跨域请求，需要将原来的var socket = io.connect('/')改成下面这一行
    // var socket = io.connect('http://localhost:3000/')
    //或者采用socket官方主页上面的方法 var socket = io()
    var socket = io();
    return {
        on: function(eventName, callback) {
            // socket.on ====== arguments =====>>> socket.on cb
            socket.on(eventName, function() {
                var args = arguments            //socket.io通信接收到的数据message
                $rootScope.$apply(function() {
                    callback.apply(socket, args)    //此时在匿名函数中，所以需要向上跳两层，直接调用socket
                })
            })
        },
        emit: function(eventName, data, callback) {
            socket.emit(eventName, data, function() {
                var args = arguments
                $rootScope.$apply(function() {
                    if (callback) {
                        callback.apply(socket, args)
                    }
                })
            })
        }
    }
}])


/*
 * textarea ctrl-enter-break-line="createMessage()"
 */
angular.module('techNodeApp').directive('ctrlEnterBreakLine', function() {
    return function(scope, element, attrs) {        // element 就是指当前的tag
        var ctrlDown = false
        // bind: sync data with
        element.bind("keydown", function(evt) {
            if (evt.which === 17) {
                ctrlDown = true
                setTimeout(function() {
                    ctrlDown = false
                }, 1000)
            }
            if (evt.which === 13) {
                if (ctrlDown) {
                    element.val(element.val() + '\n')
                } else {
                    scope.$apply(function() {
                        scope.$eval(attrs.ctrlEnterBreakLine);
                    });
                    evt.preventDefault()
                }
            }
        });
    };
});

//angular.module('techNodeApp').controller('MessageCreatorCtrl', function($scope, socket) {
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

angular.module('techNodeApp').directive('autoScrollToBottom', function() {
    return {
        link: function(scope, element, attrs) {
            scope.$watch(
                function() {
                    return element.children().length;
                },
                function() {
                    element.animate({
                        scrollTop: element.prop('scrollHeight')
                    }, 1000);
                }
            );
        }
    };
});

//angular.module('techNodeApp').controller('RoomCtrl', function($scope, socket) {
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