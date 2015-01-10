
module = angular.module("StayInView", []);

//this factory is used to generate unique ids 
module.factory("stayInView.Factory", [function () {

    var factory = {};

    //uid generator
    var uid = 0;
    factory.createUid = function () {
        uid = uid + 1;
        return uid;
    };
   

    //singleton property that calculates total height
    var totalStayHeight = 0;
    factory.totalStayHeight = function (add) {
        if (add != undefined)
            totalStayHeight += add;
        return totalStayHeight;
    }
    return factory;
}]);


module.directive("stayInView", ["stayInView.Factory", function (factory) {
    return {
        link: function (scope, element, attrs) {
            var inScope = true; //defines whether vertical went out of scope 
            var stayClass = attrs.stayInView;   //defines the class used when scrolling out of view
            if (stayClass === "") {
                stayClass = "stayInViewDefaultClass";
            }

            //append a placeholder
            var placeholderId = "__StayInView__" + factory.createUid();   //a unique id for the placeholder 
            
            //add the placeholder element
            element.after("<div id=" + placeholderId + "></div> ");
            var placeholderElement = $("#" + placeholderId);

            var elementTop; //the element offset from the begining of the document

            //on scroll event
            $(window).on("scroll", function () {
                var scrollTop = $(window).scrollTop();  //scroll location

                if (inScope)
                {
                    //because the offset might change, constantly check its vertical  position relating the document
                    elementTop = element.offset().top;
                    if (elementTop <= scrollTop + factory.totalStayHeight()) {  //if scrolled out of view
                        placeholderElement.css("padding-top", element.outerHeight()); //make the placeholder replace the same vertical height as the original element
                        element.addClass(stayClass)
                            .css("top", factory.totalStayHeight()); //make the original element stock below the other elements forced to stay in view
                        factory.totalStayHeight(element.outerHeight());
                        inScope = false;
                    }

                }
                else if (placeholderElement.offset().top - scrollTop + placeholderElement.outerHeight() > factory.totalStayHeight()) { //if scrolled back in view
                    placeholderElement.css("padding-top", 0); //eliminate the placholder presense
                    element.removeClass(stayClass); //restore the original class -- remove it from teh stack
                    factory.totalStayHeight(-element.outerHeight());    //reduce the stack height
                    inScope = true;
                }
                
            }); // on scroll

        } //link

    };
}]);