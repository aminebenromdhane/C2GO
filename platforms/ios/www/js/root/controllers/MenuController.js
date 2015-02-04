'use strict';

angular.module('c2go').controller('MenuController', ['$state', 'userService',
function ($state, userService) {

    this.goTo = function(location){
        $state.go(location);
    };

    this.logout = function(){
        userService.logout();
    };
}]);