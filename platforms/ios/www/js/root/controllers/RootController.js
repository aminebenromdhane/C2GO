'use strict';

angular.module('c2go').controller('RootController', ['$state',
  function($state) {

<<<<<<< HEAD
//    $state.go('launch');
    if(window.localStorage['didTutorial'] === "true") {
      $state.go('launch');
=======
    if(window.localStorage['didTutorial'] === "true") {
      $state.go('user.login');
>>>>>>> 2845feaaee7e9f6ecca9c347b440f5d938d46afc
    } else {
      $state.go('intro');
    }

 }]);