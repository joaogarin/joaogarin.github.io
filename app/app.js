/**************************
 Initialize the Angular App
 **************************/

var app = angular.module("app", ["ngRoute", "ngAnimate", "ngSanitize", "app.controllers","ngDisqus"]).run(["$rootScope", "$location",
    function ($rootScope, $location) {



        $(window).load(function () {

        });

    }]).config(["$routeProvider", "$locationProvider", "$disqusProvider",
    function ($routeProvider, $locationProvider, $disqusProvider) {

        //$locationProvider.hashPrefix('!');
        $disqusProvider.setShortname = "joaogarin";

        $routeProvider.when("/home", {
            redirectTo: "/"
        }).when("/", {
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

        $locationProvider.html5Mode(true);
    }
]);

window.disqus_shortname = 'joaogarinblog';