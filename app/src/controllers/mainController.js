(function (window, angular, undefined) {
    "use strict";
    var mainController = angular.module('main.controllers', []);
    mainController.controller('mainController', ['$rootScope', '$scope', '$window', 'taskHelper', '$mdDialog', '$mdToast', '$mdMedia', '$state', function ($rootScope, $scope, $window, taskHelper, $mdDialog, $mdToast, $mdMedia, $state) {
//        main controller - controls the sections in home page
        $rootScope.dateFormat = "dd/mm/yyyy";
        $scope.usersObj = taskHelper.usersObj;
        $scope.taskList = taskHelper.tasksObj;
        $scope.currentUser = taskHelper.currentUser;
        $mdToast.showSimple('Drag and drop tasks to switch status');
        
//        openNewModal function triggers opening a new modal with a new controller
//        contents of the modal is in tasks.newModal.html
        $scope.openNewModal = function (evt) {
            $mdDialog.show({
                parent: angular.element(document.body)
                , targetEvent: evt
                , escapeToClose: true
                , clickOutsideToClose: true
                , templateUrl: './src/home/tasks.newModal.html'
                , controller: 'newTaskController'
                , fullscreen: $mdMedia('sm')
                , locals: {
                    users: $scope.usersObj
                }
            }).then(function (response) {
//                logic to push the newly added task to the dom. if new task is assigned to user, add it to to do.
//                else add it to delegated tasks
                var ownTask = false;
                angular.forEach(response.assignee,function(assignee){
                   if (assignee ==  $scope.currentUser){
                       ownTask = true;
                   }
                });
                if(ownTask)
                $scope.taskList.assigned.unshift(response);
                else
                $scope.taskList.delegated.unshift(response);
                $mdToast.showSimple('New Task Created');
            });
        }
        $scope.clearSearch = function () {
            $scope.searchTaskTitle = '';
            $scope.search();
        }
//        function to search for tasks with title and description
        $scope.search = function () {
            for (var key in $scope.taskList) {
                var obj = $scope.taskList[key];
                obj = obj.map(function (item) {
                    var str = item.title.toLowerCase();
                    var dsc = item.description.toLowerCase();
                    var regex = new RegExp($scope.searchTaskTitle, "g");
                    if ($scope.searchTaskTitle) {
                        if (Array.isArray(str.match(regex) || dsc.match(regex))) {
                            item.hide = false;
                            return item;
                        }
                        else {
                            item.hide = true;
                            return item;
                        }
                    }
                    else {
                        item.hide = false;
                        return item;
                    }
                });
            }
        }
    }]);
    mainController.controller('newTaskController', ['$scope', '$rootScope', '$mdToast', 'users', '$q', 'taskHelper', '$mdDialog', '$filter', function ($scope, $rootScope, $mdToast, users, $q, taskHelper, $mdDialog, $filter) {
//       controller of the new tasks modal
        $scope.usersObj = users.map(function (user) {
            user._lowername = user.displayName.toLowerCase();
            return user;
        });
        $scope.task = {
            title: ""
            , description: ""
            , isNew: true
            , assignee: []
            , dueDate: new Date()
            , status: "assigned"
        };
        $scope.cancel = function () {
            $mdDialog.cancel();
        };
        $scope.save = function (task) {
            //                    taskHelper.newTask = task;
            task.dueDate = $filter('date')(task.dueDate, "dd/MM/yyyy");
            $mdDialog.hide(task);
        }
        var cachedQuery;
        $scope.transformChip = function (chip) {
            // If it is an object, it's already a known chip
            if (angular.isObject(chip)) {
                return {
                    chipText: chip.displayName
                };
            }
            // Otherwise, create a new one
            return {
                name: chip
                , type: 'new'
            }
        }
        $scope.querySearch = function (query) {
                var results = query ? $scope.usersObj.filter($scope.createFilterFor(query)) : [];
                return results;
            }
            /**
             * Create filter function for a query string
             */
        $scope.createFilterFor = function (query) {
            var lowercaseQuery = angular.lowercase(query);
            return function filterFn(usersObj) {
                return usersObj._lowername.indexOf(lowercaseQuery) === 0;
            };
        }
                }]);
})(window, window.angular);