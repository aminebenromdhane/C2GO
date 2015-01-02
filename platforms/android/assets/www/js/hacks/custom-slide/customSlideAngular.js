angular.module('addicaid')
    .directive('customSlideBox', [
        '$timeout',
        '$compile',
        '$ionicSlideBoxDelegate',
        function($timeout, $compile, $ionicSlideBoxDelegate) {
            return {
                restrict: 'E',
                replace: true,
                transclude: true,
                scope: {
                    autoPlay: '=',
                    doesContinue: '@',
                    slideInterval: '@',
                    showPager: '@',
                    pagerClick: '&',
                    disableScroll: '@',
                    onSlideChanged: '&',
                    activeSlide: '=?'
                },
                controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs) {
                    var _this = this;

                    var continuous = $scope.$eval($scope.doesContinue) === true;
                    var shouldAutoPlay = !angular.isUndefined($attrs.autoPlay) ? !!$scope.autoPlay : false;
                    var slideInterval = shouldAutoPlay ? $scope.$eval($scope.slideInterval) || 4000 : 0;

                    var slider = new ionic.views.CustomSlider({
                        el: $element[0],
                        auto: slideInterval,
                        continuous: continuous,
                        startSlide: $scope.activeSlide,
                        slidesChanged: function() {
                            $scope.currentSlide = slider.currentIndex();

                            // Try to trigger a digest
                            $timeout(function() {});
                        },
                        callback: function(slideIndex) {
                            $scope.currentSlide = slideIndex;
                            $scope.onSlideChanged({ index: $scope.currentSlide, $index: $scope.currentSlide});
                            $scope.$parent.$broadcast('slideBox.slideChanged', slideIndex);
                            $scope.activeSlide = slideIndex;
                            // Try to trigger a digest
                            $timeout(function() {});
                        }
                    });

                    slider.enableSlide($scope.$eval($attrs.disableScroll) !== true);

                    $scope.$watch('activeSlide', function(nv) {
                        if(angular.isDefined(nv)){
                            slider.slide(nv);
                        }
                    });

                    $scope.$on('slideBox.nextSlide', function() {
                        slider.next();
                    });

                    $scope.$on('slideBox.prevSlide', function() {
                        slider.prev();
                    });

                    $scope.$on('slideBox.setSlide', function(e, index) {
                        slider.slide(index);
                    });

                    //Exposed for testing
                    this.__slider = slider;

                    var deregisterInstance = $ionicSlideBoxDelegate._registerInstance(slider, $attrs.delegateHandle);
                    $scope.$on('$destroy', deregisterInstance);

                    this.slidesCount = function() {
                        return slider.slidesCount();
                    };

                    this.onPagerClick = function(index) {
                        void 0;
                        $scope.pagerClick({index: index});
                    };

                    $timeout(function() {
                        slider.load();
                    });
                }],
                template: '<div class="slider">' +
                '<div class="slider-slides" ng-transclude>' +
                '</div>' +
                '</div>',

                link: function($scope, $element, $attr, slideBoxCtrl) {
                    // If the pager should show, append it to the slide box
                    if($scope.$eval($scope.showPager) !== false) {
                        var childScope = $scope.$new();
                        var pager = jqLite('<ion-pager></ion-pager>');
                        $element.append(pager);
                        $compile(pager)(childScope);
                    }
                }
            };
        }])
    .directive('customSlide', function() {
        return {
            restrict: 'E',
            require: '^customSlideBox',
            compile: function(element, attr) {
                element.addClass('slider-slide');
                return function($scope, $element, $attr) {
                };
            },
        };
    })

    .directive('customPager', function() {
        return {
            restrict: 'E',
            replace: true,
            require: '^customSlideBox',
            template: '<div class="slider-pager"><span class="slider-pager-page" ng-repeat="slide in numSlides() track by $index" ng-class="{active: $index == currentSlide}" ng-click="pagerClick($index)"><i class="icon ion-record"></i></span></div>',
            link: function($scope, $element, $attr, slideBox) {
                var selectPage = function(index) {
                    var children = $element[0].children;
                    var length = children.length;
                    for(var i = 0; i < length; i++) {
                        if(i == index) {
                            children[i].classList.add('active');
                        } else {
                            children[i].classList.remove('active');
                        }
                    }
                };

                $scope.pagerClick = function(index) {
                    slideBox.onPagerClick(index);
                };

                $scope.numSlides = function() {
                    return new Array(slideBox.slidesCount());
                };

                $scope.$watch('currentSlide', function(v) {
                    selectPage(v);
                });
            }
        };

    });