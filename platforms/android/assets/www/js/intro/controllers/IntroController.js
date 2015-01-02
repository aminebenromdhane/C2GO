'use strict';

angular.module('addicaid').controller('IntroController', ['$scope', '$state', '$ionicSlideBoxDelegate',
  function($scope, $state, $ionicSlideBoxDelegate) {
    var scope = this;

    this.startApp = function() {
      $state.go('news.daily');
      window.localStorage['didTutorial'] = true;
    };

    this.next = function() {
      $ionicSlideBoxDelegate.next();
    };


    this.slideChanged = function(index) {


    };
  }]);