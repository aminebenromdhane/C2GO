'use strict';

angular.module('c2go').controller('MenuController', ['$state',
function ($state) {

    this.goTo = function(location){
        $state.go(location);
    };

}]);