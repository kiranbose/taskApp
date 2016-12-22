(function (window, angular, undefined) {
    "use strict";
    var taskHelper = angular.module("task.helper", []);
    taskHelper.service("taskHelper", 
        ['$rootScope',function ($rootScope) {
//            helper service - to feed static data into the app.
        var $scope = this;
//            array of users
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
         },
         {
          displayName: "jose",  
          email: "jose@weavedIn.com",  
          profilePic: "http://i304.photobucket.com/albums/nn190/lordmyx/mymanga.jpg"  
         },
         {
          displayName: "k9",  
          email: "k9@weavedIn.com",  
          profilePic: "http://i304.photobucket.com/albums/nn190/lordmyx/mymanga.jpg"  
         }
        ];
//        aray of tasks - dynamic - tasks can be added    
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