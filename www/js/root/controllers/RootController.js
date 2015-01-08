'use strict';

angular.module('c2go').controller('RootController', ['$state',
  function($state) {

    $state.go('user.signup');
/*    if(window.localStorage['didTutorial'] === "true") {
      $state.go('intro');
    }else{
      $state.go('intro');
    }
*/
 }]);