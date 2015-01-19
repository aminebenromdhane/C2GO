'use strict';

angular.module('c2go').controller('IntroController', ['$scope', '$state', '$ionicSlideBoxDelegate', '$stateParams',
  function($scope, $state, $ionicSlideBoxDelegate, $stateParams) {
    var _this = this;

    if(!angular.isUndefined($stateParams.slide)){
      this.currentSlide = $stateParams.slide;
    }else{
      this.currentSlide = 0;
    }

    this.startApp = function() {
      window.localStorage['didTutorial'] = true;
    };

    this.back = function() {
      $ionicSlideBoxDelegate.previous();
    };

    this.atBeginning = function() {
      return $ionicSlideBoxDelegate.currentIndex() === 0;
    };

    this.next = function() {
      $ionicSlideBoxDelegate.next();
    };

    this.startApp();
  }]);