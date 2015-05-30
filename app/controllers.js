/*
 Application controllers
 Main controllers for the app
 */

angular.module("app.controllers", []).controller("AdminAppCtrl", ["$scope", "$location",
    function($scope, $location) {

    }
]).controller("NavCtrl", ["$scope",
    function($scope) {

        $scope.info = {
            blogger_name: "Joao Garin"
        };

        var bodyEl = document.body,
            content = document.querySelector( '.content-wrap' ),
            openbtn = document.getElementById( 'open-button' ),
            isOpen = false;

        $scope.toggleMenu = function(){

            if( isOpen ) {
                classie.remove( bodyEl, 'show-menu' );
            }
            else {
                classie.add( bodyEl, 'show-menu' );
            }
            isOpen = !isOpen;

        };

        $scope.initEvents = function(){

            openbtn.addEventListener( 'click', $scope.toggleMenu );

            // close the menu element if the target it´s not the menu element or one of its descendants..
            /*content.addEventListener( 'click', function(ev) {
                var target = ev.target;
                if( isOpen && target !== openbtn ) {
                    $scope.toggleMenu();
                }
            } );*/

        };

        $scope.initEvents();

    }
]).controller("HomeCtrl", ['$scope', '$location', '$anchorScroll',
    function($scope, $location, $anchorScroll) {


        $scope.theme_info = {
              catchy:"Development stories",
              name:"Joao Garin",
              description:"Front end developer, Drupal enthusiast and a very medium Designer",
              link: "https://github.com/davidhwang/horseman",
              link_text:"This website is built using Drupal8 and AngularJs"
        };

        new Slideshow( document.getElementById( 'slideshow-1' ) );

        setTimeout( function() {
            new Slideshow( document.getElementById( 'slideshow-2' ) );
        }, 1750 );

        /* Mockup responsiveness */
        var body = window.document.documentElement,
            wrap = document.getElementById( 'wrap' ),
            mockup = document.getElementById( 'mockup' ),
            mockupWidth = mockup.offsetWidth;

        $scope.scaleMockup = function() {
            var wrapWidth = wrap.offsetWidth,
                val = wrapWidth / mockupWidth;

            mockup.style.transform = 'scale3d(' + val + ', ' + val + ', 1)';
        };

        $scope.scaleMockup();

        $scope.resizeHandler = function() {
            function delayed() {
                $scope.resize();
                resizeTimeout = null;
            }

            if ( typeof resizeTimeout != 'undefined' ) {
                clearTimeout( resizeTimeout );
            }
            resizeTimeout = setTimeout( delayed, 50 );
        };

        window.addEventListener( 'resize', $scope.resizeHandler );

        $scope.resize = function() {
            $scope.scaleMockup();
        };

        var content_wrap = document.getElementById('home-wrap');

        $scope.changeButtonColor = function(){

            var wrapHeight = wrap.offsetHeight;
            var top  = $("#home-wrap").scrollTop();

            if(top < wrapHeight){
                $(".main--wrap__menu-button").addClass("is-white");
            }
            else{
                $(".main--wrap__menu-button").removeClass("is-white");
            }
        };


        $scope.changeButtonColor();
        content_wrap.addEventListener('scroll',$scope.changeButtonColor);

        $scope.gotoBlogHome = function() {

            $('#home-wrap').animate({
                scrollTop: $(".blog-items").offset().top
            }, 500);
        };

    }
]).controller("BlogCtrl",["$scope","BlogFeedFields", function($scope,BlogFeedFields){

    $scope.Feeds = BlogFeedFields;

    $scope.finishedloading = BlogFeedFields.finishedloading;

    //console.log($scope.Feeds);

}]).controller("BlogSingleCtrl",["$scope","$routeParams","$location","BlogSinglePost","AliasSrv", function($scope,$routeParams,$location,BlogSinglePost,AliasSrv){

    $scope.BlogItem = BlogSinglePost;

    $scope.Alias = AliasSrv;

    AliasSrv.getIdByTitle($routeParams.title,function(response){

        if(typeof AliasSrv.nid != "undefined"){
            BlogSinglePost.getPost(AliasSrv.nid);
        }
        else{
            var path = $location.path('/404');
        }
    });

    //console.log(BlogSinglePost);



}]);

