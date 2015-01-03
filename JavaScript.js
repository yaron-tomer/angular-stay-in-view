/// <reference path="angular.js" />
module = angular.module("StayInView", []);

module.factory("uidFactory", [function () {
    var uid = 0;
    var uidFactory = {};
    uidFactory.create = function () {
        uid = uid + 1;
        return uid;
    };
    return uidFactory;
}]);


module.directive("stayInView", ["uidFactory", function (uidFactory) {
    return{
        scope:true,
        link: function (scope, element, attrs) {          
            var elementTop = undefined;
            var elementHeight = undefined;
            var stayClass = attrs.stayInView;
            if (stayClass === "") {
                stayClass = "stayInViewDefaultClass";
            }
            scope.placeholderId = "__StayInView__" + uidFactory.create();

            //append a placeholder
            element.after("<div id=" + scope.placeholderId + "></div> ");

            
            //on scroll event
            $(window).on("scroll", function () {
                if (elementTop == undefined) {
                    elementTop = element.offset().top;
                    elementHeight = element.outerHeight();
                }
                var scrollTop =  $(window).scrollTop();
                console.log("scrolled: " + scrollTop + "   element:" + elementTop);
                if (elementTop <= scrollTop) {
                    element.addClass(stayClass);
                    $("#" + scope.placeholderId).css("padding-top", elementHeight);
                }
                else {
                    element.removeClass(stayClass);
                    $("#" + scope.placeholderId).css("padding-top", "0px");
                }
                
            });


            element.on("mousedown", function () {
                console.log("mousedown");
            });
        } //link

    };
}]);