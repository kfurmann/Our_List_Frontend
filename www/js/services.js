angular.module('starter.services', [])

    .factory('Tasks', ['$http', function ($http) {
        var chats = [];
        var promise = $http.post('http://localhost:3000/tasks', {'user_id': '557c93e8669e33dc14a5f924'});

        promise.success(function(data, status, headers, config){
            chats = data.data;
        });

        promise.finally(function(){
            //
        });

        return {

            requestPromise: promise,
            all: function () {
                return chats;
            },
            remove: function (chat) {
                chats.splice(chats.indexOf(chat), 1);
            },
            get: function (chatId) {
                for (var i = 0; i < chats.length; i++) {
                    if (chats[i].id === parseInt(chatId)) {
                        return chats[i];
                    }
                }
                return null;
            }
        };
    }])
    .factory('Users', ['$http', function($http){
        var chats = [];

        return {

            find: function(name) {
                return $http.post('http://localhost:3000/findUsersByName', {'name': name});
            },
            sendInvitation: function(user) {
                return $http.post('http://localhost:3000/sendInvitationToUser', {'toUserId': user._id});
            }
        }
    }]);
