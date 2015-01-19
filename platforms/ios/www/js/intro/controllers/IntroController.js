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
<<<<<<< HEAD
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

=======
      $ionicSlideBoxDelegate.next();
    };

    this.isLastSlide = function() {
      return $ionicSlideBoxDelegate.currentIndex() === 4;
    };

>>>>>>> 2845feaaee7e9f6ecca9c347b440f5d938d46afc
    this.startApp();
  }]);