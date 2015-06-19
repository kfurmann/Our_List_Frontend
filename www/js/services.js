angular.module('starter.services', [])

    .factory('Principal', ['$q', '$http', 'SERVER_URL', function ($q, $http, SERVER_URL) {

        var _identity = undefined;
        var _authenticated = false;
        var accessToken = '';

        return {
            isIdentityResolved: function () {
                return angular.isDefined(_identity);
            },
            isAuthenticated: function () {
                return _authenticated;
            },
            authenticate: function (identity) {
                _identity = identity;
                _authenticated = identity != null;
            },
            identity: function (force) {
                var deferred = $q.defer();

                if (force === true) _identity = undefined;

                if (angular.isDefined(_identity)) {
                    deferred.resolve(_identity);

                    return deferred.promise;
                }

                $http.get(SERVER_URL + '/amiloggedin', {params: {access_token: accessToken}, ignoreErrors: true})
                    .success(function (data) {
                        console.log(data);
                        _identity = data;
                        _authenticated = true;
                        deferred.resolve(_identity);
                    })
                    .error(function () {
                        _identity = null;
                        _authenticated = false;
                        deferred.resolve(_identity);
                    });

                return deferred.promise;
            }
        }

    }])
    .factory('Tasks', ['$http', function ($http) {
        var chats = [];

        return {

            requestPromise: function () {
                var promise = $http.post('http://localhost:3000/tasks', {'user_id': '557c93e8669e33dc14a5f924'});

                promise.success(function (data, status, headers, config) {
                    chats = data.data;
                });

                promise.finally(function () {
                    //
                });

                return promise;
            },
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
    .factory('Users', ['$http', function ($http) {
        var chats = [];

        return {

            find: function (name) {
                return $http.post('http://localhost:3000/findUsersByName', {'name': name});
            },
            sendInvitation: function (user) {
                return $http.post('http://localhost:3000/sendInvitationToUser', {'toUserId': user._id});
            }
        }
    }]);
