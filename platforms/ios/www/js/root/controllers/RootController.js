'use strict';

angular.module('c2go').controller('RootController', ['$state',
  function($state) {

//    $state.go('launch');
    if(window.localStorage['didTutorial'] === "true") {
      $state.go('launch');
    } else {
      $state.go('intro');
    }

 }]);