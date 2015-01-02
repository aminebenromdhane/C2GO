'use strict';

angular.module('addicaid').controller('HeaderController', ['$state',
function ($state) {
    this.goTo = function(location){
        $state.go(location);
    };
}]);