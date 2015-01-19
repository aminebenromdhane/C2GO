'use strict';

angular.module('c2go').controller('IntroController', ['$scope', '$state', '$ionicSlideBoxDelegate',
  function($scope, $state, $ionicSlideBoxDelegate) {
    var _this = this;

    this.startApp = function() {
//      $state.go('news.daily');
      window.localStorage['didTutorial'] = true;
    };

    this.back = function() {
      $ionicSlideBoxDelegate.previous();
    };

    this.atBeginning = function() {
      return $ionicSlideBoxDelegate.currentIndex() === 0;
    };

    this.next = function() {
      if ($ionicSlideBoxDelegate.currentIndex() === 5) {
        this.goHome();
      }
      else {
        $ionicSlideBoxDelegate.next();
      }
    };

    // not used
    this.slideChanged = function(index) {
    };

    this.goHome = function() {
      $state.go('launch');
    }

    this.startApp();
  }]);