angular.module('starter.controllers', [])

    .controller('TasksCtrl', ['$scope', 'Tasks', function ($scope, Tasks) {
        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //
        //$scope.$on('$ionicView.enter', function(e) {
        //});
        Tasks.requestPromise.finally(function () {
            $scope.tasks = Tasks.all();
        });

        $scope.remove = function (chat) {
            Tasks.remove(chat);
        }
    }])

    .controller('ChatDetailCtrl', function ($scope, $stateParams, Tasks) {
        $scope.chat = Tasks.get($stateParams.chatId);
    })

    .controller('AccountCtrl', ['$scope', '$ionicPopup', 'Users', function ($scope, $ionicPopup, Users) {
        $scope.settings = {
            enableFriends: true
        };
        $scope.userNameToSearch = '';

        $scope.findUser = function () {
            console.log(this.userNameToSearch);
            Users.find(this.userNameToSearch).success(function (data, status, headers, config) {
                $scope.users = data.data;
            }).error(function(err){
                console.log(err);
            });
        };
        $scope.showConfirm = function(user) {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Send Invitation',
                template: 'Invite ' + user.name + ' to share lists?'
            });
            confirmPopup.then(function(res) {
                if(res) {
                    Users.sendInvitation(user);
                } else {
                    //
                }
            });
        };
    }]);
