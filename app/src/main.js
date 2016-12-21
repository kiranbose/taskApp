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