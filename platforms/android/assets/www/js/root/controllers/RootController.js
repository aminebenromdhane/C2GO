'use strict';

angular.module('addicaid').controller('RootController', ['$state',
  function($state) {

    if(window.localStorage['didTutorial'] === "true") {
      $state.go('news.daily');
    }else{
      $state.go('news.daily');
      //$state.go('intro');
    }


 }]);