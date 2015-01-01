/// <reference path="angular.js" />
module = angular.module("searchy", []);




module.directive("dynamicSearch", [function () {
    return{

        link: function (scope, element, attrs) {
            
            var elementTop = undefined;
            var elementHeight = undefined;
            
            //on scroll event
            $(window).on("scroll", function () {
                if (elementTop == undefined) {
                    elementTop = element.offset().top;
                    elementHeight = element.outerHeight();
                }
                var scrollTop =  $(window).scrollTop();
                console.log("scrolled: " + scrollTop + "   element:" + elementTop);
                if (elementTop <= scrollTop) {
                    element.addClass("search-fixed");
                    $(".search-place-holder").css("padding-top",  elementHeight);
                }
                else {
                    element.removeClass("search-fixed");
                    $(".search-place-holder").css("padding-top", "0px");
                }
                
            });


            element.on("mousedown", function () {
                console.log("mousedown");
            });
        } //link

    };
}]);