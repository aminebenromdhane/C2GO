'use strict';

angular.module('c2go').controller('HeaderController', ['$state',
function ($state) {
    this.goTo = function(location){
        $state.go(location);
    };
}]);