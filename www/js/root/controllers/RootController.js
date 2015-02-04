'use strict';

angular.module('c2go').controller('RootController', ['$state', 'userRouter',
  function($state, userRouter) {

    if(window.localStorage['didTutorial'] === "true") {
      userRouter.home();
    } else {
      $state.go('intro');
    }

 }]);