/// <reference path="angular.js" />
module = angular.module("searchy", []);




module.directive("dynamicSearch", [function () {
    return{

        link: function (scope, element, attrs) {
 
            $(window).on("scroll", function () {
                element.css('background-color', 'red');
                var top =  $(window).scrollTop();
                console.log("scrolled: "+top);
                
            });
            element.on("mousedown", function () {
                console.log("mousedown");
            });
        } //link

    };
}]);