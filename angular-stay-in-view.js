
module = angular.module("StayInView", []);

//this factory is used to generate unique ids 
module.factory("uidFactory", [function () {
    var uid = 0;
    var uidFactory = {};
    uidFactory.create = function () {
        uid = uid + 1;
        return uid;
    };
    return uidFactory;
}]);


module.directive("stayInView", ["uidFactory",  function (uidFactory) {
    return{
        link: function (scope, element, attrs) {          
            var elementTop = undefined; //dimension used to calculate location of element from top of page, so it can be calculated when it is scrolled out of view
            var elementHeight = undefined;  //dimension used to know the height of the element, so that we can set the placeholder div to its height and prevent a jitter in the scroll
            var stayClass = attrs.stayInView;   //defines the class used when scrolling out of view
            if (stayClass === "") {
                stayClass = "stayInViewDefaultClass";
            }

            //append a placeholder
            var placeholderId = "__StayInView__" + uidFactory.create();   //a unique id for the placeholder 
            element.after("<div id=" + placeholderId + "></div> ");

            
            //on scroll event
            $(window).on("scroll", function () {
                if (elementTop == undefined) {  //calculate element location and height
                    elementTop = element.offset().top;
                    elementHeight = element.outerHeight();
                }
                var scrollTop =  $(window).scrollTop();
                if (elementTop <= scrollTop) {  //if scrolled out of view
                    element.addClass(stayClass);
                    $("#" + placeholderId).css("padding-top", elementHeight);
                }
                else {  //if scrolled back in view
                    element.removeClass(stayClass);
                    $("#" + placeholderId).css("padding-top", "0px");
                }
                
            }); // on scroll

        } //link

    };
}]);