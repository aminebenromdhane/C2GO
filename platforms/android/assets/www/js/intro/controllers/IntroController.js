'use strict';

angular.module('c2go').controller('IntroController', ['$scope', '$state', '$ionicSlideBoxDelegate',
  function($scope, $state, $ionicSlideBoxDelegate) {
    var _this = this;

    this.startApp = function() {
//      $state.go('news.daily');
      window.localStorage['didTutorial'] = true;
    };

    this.next = function() {
      $ionicSlideBoxDelegate.next();
    };


    this.slideChanged = function(index) {


    };
  }]);