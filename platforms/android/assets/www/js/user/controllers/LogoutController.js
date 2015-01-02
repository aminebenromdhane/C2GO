'use strict';

angular.module('addicaid').controller('LogoutController', ['userService', '$state', 'home',
function (userService, $state, home) {
    var _this = this;

    this.logout = function(){
        userService.logout().then(
            function(){
                $state.go(home);
            }
        );
    };
}]);