/**
 * Created by kiran on 1/17/2016.
 */
(function(window, angular, undefined) {
    "use strict";

    var app = angular.module("main", ['ui.router','ui.tree','ngAnimate','ngMaterial','main.controllers','task.helper']);

    app.config(['$stateProvider','$urlRouterProvider','$mdThemingProvider',function($stateProvider,$urlRouterProvider, $mdThemingProvider) {
        // For any unmatched url, redirect to /state1
        $mdThemingProvider.theme('default')
        .primaryPalette('blue')
        .accentPalette('orange');
      
        $urlRouterProvider.otherwise("/home");
        $stateProvider
            .state('home', {
                url: "/home",
                templateUrl: "src/home/home.html",
                controller: 'mainController',
                onEnter: function() {
                	console.log("main");
                },
                onExit: function() {
                }
            })

    }]);
    
    

})(window, window.angular);
(function (window, angular, undefined) {
    "use strict";
    var mainController = angular.module('main.controllers', []);
    mainController.controller('mainController', ['$rootScope', '$scope', '$window', 'taskHelper', '$mdDialog', '$mdToast', '$mdMedia', '$state', function ($rootScope, $scope, $window, taskHelper, $mdDialog, $mdToast, $mdMedia, $state) {
        $rootScope.dateFormat = "dd/mm/yyyy";
        $scope.usersObj = taskHelper.usersObj;
        $scope.taskList = taskHelper.tasksObj;
        $mdToast.showSimple('Drag and drop tasks to switch status');
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
                $scope.taskList.assigned.unshift(response);
                $state.go(home);
                $mdToast.showSimple('New Task Created');
            });
        }
        $scope.clearSearch = function () {
            $scope.searchTaskTitle = '';
            $scope.search();
        }
//        function to search for tasks with title and description
        $scope.search = function () {
            //            $scope.dummy = angular.copy($scope.taskList);
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
        $scope.usersObj = users.map(function (user) {
            //                    user.displayName = user.displayName.toLowerCase();
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
(function (window, angular, undefined) {
    "use strict";
    var taskHelper = angular.module("task.helper", []);
    taskHelper.service("taskHelper", 
        ['$rootScope',function ($rootScope) {
        var $scope = this;
        $scope.usersObj = [
         {
          displayName: "user",  
          email: "user@weavedIn.com",  
          profilePic: "http://i.imgur.com/DUajdFXs.jpg"  
         },
         {
          displayName: "arnold",  
          email: "arnold@weavedIn.com",  
          profilePic: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50.jpg"  
         },
         {
          displayName: "daenerys",  
          email: "daenerys@weavedIn.com",  
          profilePic: "http://i304.photobucket.com/albums/nn190/lordmyx/mymanga.jpg"  
         },
         {
          displayName: "viserys",  
          email: "viserys@weavedIn.com",  
          profilePic: "http://i304.photobucket.com/albums/nn190/lordmyx/mymanga.jpg"  
         },
         {
          displayName: "dracarys",  
          email: "dracarys@weavedIn.com",  
          profilePic: "http://i304.photobucket.com/albums/nn190/lordmyx/mymanga.jpg"  
         },
         {
          displayName: "sith",  
          email: "sith@weavedIn.com",  
          profilePic: "http://i304.photobucket.com/albums/nn190/lordmyx/mymanga.jpg"  
         },
         {
          displayName: "bean",  
          email: "bean@weavedIn.com",  
          profilePic: "http://i304.photobucket.com/albums/nn190/lordmyx/mymanga.jpg"  
         },
         {
          displayName: "ford",  
          email: "ford@weavedIn.com",  
          profilePic: "http://i304.photobucket.com/albums/nn190/lordmyx/mymanga.jpg"  
         },
         {
          displayName: "cat",  
          email: "cat@weavedIn.com",  
          profilePic: "http://i304.photobucket.com/albums/nn190/lordmyx/mymanga.jpg"  
         },
         {
          displayName: "rash",  
          email: "rash@weavedIn.com",  
          profilePic: "http://i304.photobucket.com/albums/nn190/lordmyx/mymanga.jpg"  
         },
         {
          displayName: "tom",  
          email: "tom@weavedIn.com",  
          profilePic: "http://i304.photobucket.com/albums/nn190/lordmyx/mymanga.jpg"  
         },
         {
          displayName: "pel",  
          email: "pel@weavedIn.com",  
          profilePic: "http://i304.photobucket.com/albums/nn190/lordmyx/mymanga.jpg"  
         },
         {
          displayName: "uvuveve",  
          email: "uvuveve@weavedIn.com",  
          profilePic: "http://i304.photobucket.com/albums/nn190/lordmyx/mymanga.jpg"  
         },
         {
          displayName: "owewewe",  
          email: "owewewe@weavedIn.com",  
          profilePic: "http://i304.photobucket.com/albums/nn190/lordmyx/mymanga.jpg"  
         }
        ];
                       
        $scope.tasksObj ={
            assigned: [
                {
                       title: "Create Order",
                       description: "General Task",
                       isNew: false,
                       assignee: [$scope.usersObj[0]],
                       dueDate: "2/8/2016",
                       status: "assigned"
                },
                 {
                       title: "Shipping Order",
                       description: "Shipping Task",
                       isNew: false,
                       assignee: [$scope.usersObj[0]],
                       dueDate: "2/8/2016",
                       status: "assigned"
                 },
                 {
                       title: "Get 300 Orders",
                       description: "Get Task",
                       isNew: false,
                       assignee: [$scope.usersObj[0]],
                       dueDate: "2/8/2016",
                       status: "assigned"
                 }
            ],
            started: [
                {
                       title: "started Task",
                       description: "in progress",
                       isNew: false,
                       assignee: [$scope.usersObj[4],$scope.usersObj[0]],
                       dueDate: "2/8/2016",
                       status: "started"
                },
                {
                       title: "Create samples",
                       description: "in demo mode",
                       isNew: false,
                       assignee: [$scope.usersObj[4]],
                       dueDate: "2/8/2016",
                       status: "started"
                },
                {
                       title: "Create snippets",
                       description: "snippets task",
                       isNew: false,
                       assignee: [$scope.usersObj[4]],
                       dueDate: "2/8/2016",
                       status: "started"
                },
                {
                       title: "Create samples",
                       description: "simple task",
                       isNew: false,
                       assignee: [$scope.usersObj[0]],
                       dueDate: "2/8/2016",
                       status: "started"
                },
            ],
            waiting: [
                {
                       title: "Create Excel",
                       description: "Documentation Task",
                       isNew: false,
                       assignee: [$scope.usersObj[2]],
                       dueDate: "2/8/2016",
                       status: "waiting"
                },
                {
                       title: "Create Word",
                       description: "Documentation Task",
                       isNew: false,
                       assignee: [$scope.usersObj[3]],
                       dueDate: "2/8/2016",
                       status: "waiting"
                },
                {
                       title: "Create ppt",
                       description: "Documentation Task",
                       isNew: false,
                       assignee: [$scope.usersObj[0]],
                       dueDate: "2/8/2016",
                       status: "waiting"
                },
                {
                       title: "Create pptx",
                       description: "Presentation Task",
                       isNew: false,
                       assignee: [$scope.usersObj[4]],
                       dueDate: "2/8/2016",
                       status: "waiting"
                }
            ],
            delegated: [
                {
                       title: "Ship Boxes",
                       description: "Shipping Task",
                       isNew: false,
                       assignee: [$scope.usersObj[2]],
                       dueDate: "2/8/2016",
                       status: "delegated"
                },
                {
                       title: "Logistics",
                       description: "Shipping Task",
                       isNew: false,
                       assignee: [$scope.usersObj[2]],
                       dueDate: "2/8/2016",
                       status: "delegated"
                },
                {
                       title: "Ship Glasses",
                       description: "Logistics",
                       isNew: false,
                       assignee: [$scope.usersObj[2]],
                       dueDate: "2/8/2016",
                       status: "delegated"
                },
                {
                       title: "Cargo",
                       description: "Logistics",
                       isNew: false,
                       assignee: [$scope.usersObj[2]],
                       dueDate: "2/8/2016",
                       status: "delegated"
                },
            ],
            completed: [
                {
                       title: "Ping Task",
                       description: "Network Task",
                       isNew: false,
                       assignee: [$scope.usersObj[2]],
                       dueDate: "2/7/2016",
                       status: "completed"
                },
                {
                       title: "Handshake Task",
                       description: "Network Task",
                       isNew: false,
                       assignee: [$scope.usersObj[2]],
                       dueDate: "3/8/2016",
                       status: "completed"
                },
                {
                       title: "Protocol Task",
                       description: "Network Task",
                       isNew: false,
                       assignee: [$scope.usersObj[2]],
                       dueDate: "2/8/2016",
                       status: "completed"
                },
            ]
        }; 
                       
        $scope.currentUser = $scope.usersObj[0];
    }]);
})(window, window.angular);