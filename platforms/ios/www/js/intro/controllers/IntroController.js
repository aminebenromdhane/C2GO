'use strict';

angular.module('c2go').controller('IntroController', ['$scope', '$state', '$ionicSlideBoxDelegate',
  function($scope, $state, $ionicSlideBoxDelegate) {
    var _this = this;

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

    this.isLastSlide = function() {
      return $ionicSlideBoxDelegate.currentIndex() === 4;
    };

    this.startApp();
  }]);