/// <reference path="angular.js" />
module = angular.module("searchy", []);




module.directive("dynamicSearch", [function () {
    return{

        link: function (scope, element, attrs) {
            //var elementTop = element.offset().top;
            var elementTop = 100;
            $(window).on("scroll", function () {
                var scrollTop =  $(window).scrollTop();
                console.log("scrolled: " + scrollTop + "   element:" + elementTop);
                if (elementTop <= scrollTop) {
                    element.addClass("search-fixed");
                    $(".search-place-holder").css("padding-top", "130px");
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