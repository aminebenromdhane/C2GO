angular.module('addicaid')
    .directive('imageSlideBox', [
        function() {
            return {
                restrict: 'E',
                replace: true,
                transclude: true,
                scope: {
                },
                controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs) {

                }],
                template: '<div>' +
                '<div ng-transclude style="text-align: center;height:100px;" on-swipe-left="next()" on-swipe-right="prev()">' +
                '</div>' +
                '</div>',
                link: function($scope, $element, $attr) {
                    console.log("qwdwqdq");
                    var _this = this;
                    var images = $element[0].children[0].children;
                    $element[0].style.width = (images.length * 100) + 'px';
                    var selected = Math.floor(images.length / 2);
                    var left = 0;

                    var setup = function(){
                        images[selected].children[0].classList.add('selected');
                        angular.forEach(images,function(image){
                            image.style.position = 'relative';
                            image.style.left = '0px';
                            scale(image);
                            translate(image, 60);
                        });
                        fixPosition();
                    };
                    var translate = function(image, dist) {
                        var style = image.style;

                        if (!style) return;

                        style.webkitTransitionDuration =
                            style.MozTransitionDuration =
                                style.msTransitionDuration =
                                    style.OTransitionDuration =
                                        style.transitionDuration = 500 + 'ms';

                        style.webkitTransform = 'translate(' + dist + 'px,0)' + 'translateZ(0)';
                        style.msTransform =
                            style.MozTransform =
                                style.OTransform = 'translateX(' + dist + 'px)';

                    };
                    var scale = function(image) {
                        var style = image.children[0].style;

                        if (!style) return;

                        style.webkitTransitionDuration =
                            style.MozTransitionDuration =
                                style.msTransitionDuration =
                                    style.OTransitionDuration =
                                        style.transitionDuration = 500 + 'ms';

                        style.webkitTransitionProperty =
                            style.MozTransitionProperty =
                                style.msTransitionProperty =
                                    style.OTransitionProperty =
                                        style.transitionProperty = 'width,height';

                    };
                    var fixPosition = function(){
                        angular.forEach(images,function(image){
                            image.style.left = left + 'px';
                        });
                    };
                    $scope.next = function(){
                        console.log('next');
                        if(selected >= images.length - 1){
                            return;
                        }
                        left -= 60;
                        fixPosition();
                        images[selected].children[0].classList.remove('selected');
                        selected++;
                        images[selected].children[0].classList.add('selected');
                    };
                    $scope.prev = function(){
                        console.log('prev');
                        if(selected <= 0){
                            return;
                        }
                        left += 60;
                        fixPosition();
                        images[selected].children[0].classList.remove('selected');
                        selected--;
                        images[selected].children[0].classList.add('selected');
                    };

                    setup();
                }
            };
        }])
    .directive('imageSlide', function() {
        return {
            restrict: 'E',
            require: '^imageSlideBox',
            compile: function(element, attr) {
                element.addClass('');
                return function($scope, $element, $attr) {
                };
            }
        };
    });