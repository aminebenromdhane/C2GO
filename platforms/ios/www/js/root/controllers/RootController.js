'use strict';

angular.module('c2go').controller('RootController', ['$state',
  function($state) {

    if(window.localStorage['didTutorial'] === "true") {
      $state.go('user.login');
    } else {
      $state.go('intro');
    }

 }]);