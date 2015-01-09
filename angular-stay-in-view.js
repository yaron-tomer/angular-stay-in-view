
module = angular.module("StayInView", []);

//this factory is used to generate unique ids 
module.factory("stayInView.Factory", [function () {
    var uid = 0;
    var factory = {};
    var order = [];
    factory.createUid = function () {
        uid = uid + 1;
        return uid;
    };
    factory.order = function () {
        return order;
    }
    return factory;
}]);


module.directive("stayInView", ["stayInView.Factory", function (factory) {
    return {
        scope: true,
        link: function (scope, element, attrs) {
            var inScope = true;
            var stayClass = attrs.stayInView;   //defines the class used when scrolling out of view
            if (stayClass === "") {
                stayClass = "stayInViewDefaultClass";
                scope.stayClass = stayClass;
            }

            //append a placeholder
            var placeholderId = "__StayInView__" + factory.createUid();   //a unique id for the placeholder 
            
            //add the placeholder element
            element.after("<div id=" + placeholderId + "></div> ");
            placeholderElement = $("#" + placeholderId);

            var elementTop; //the element offset from the begining of the document

            //on scroll event
            $(window).on("scroll", function () {
                var scrollTop = $(window).scrollTop();

                if (inScope)
                {
                    //because the offset might change, constantly check its vertical  position relating the document
                    elementTop = element.offset().top;
                    if (elementTop <= scrollTop) {  //if scrolled out of view
                        element.addClass(stayClass);
                        placeholderElement.css("padding-top", element.outerHeight());
                        angular.forEach(factory.order(), function (el) {
                            el.removeClass(el.scope().stayClass);
                        });

                        factory.order().push(element);
                        inScope = false;
                    }

                }
                else {
                    //var placeholderTop = placeholderElement.offset().top;
                    //if (placeholderTop > scrollTop) {  //if scrolled back in view
                    //    element.removeClass(stayClass);
                    //    $("#" + placeholderId).css("padding-top", "0px");
                    //    factory.order().pop();
                    //    inScope = true;
                    //}
                }
                
            }); // on scroll

        } //link

    };
}]);