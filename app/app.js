/**************************
 Initialize the Angular App
 **************************/

var app = angular.module("app", ["ngRoute", "ngAnimate", "ngSanitize", "app.controllers"]).run(["$rootScope", "$location",
    function ($rootScope, $location) {

        $(window).load(function () {

        });

    }]).config(["$routeProvider",
    function ($routeProvider) {
        return $routeProvider.when("/", {
            redirectTo: "/home"
        }).when("/home", {
            templateUrl: "app/views/home.html"
        }).when("/about", {
            templateUrl: "app/views/about.html"
        }).when("/blog/:title", {
            templateUrl: "app/views/blog.html"
        }).when("/404", {
            templateUrl: "app/views/404.html"
        }).otherwise({
            redirectTo: "/404"
        });
    }
]);

