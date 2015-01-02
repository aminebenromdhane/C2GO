'use strict';

angular.module('addicaid').controller('MenuController', ['$state',
function ($state) {

    this.goTo = function(location){
        $state.go(location);
    };

}]);