'use strict';

angular.module('c2go').factory('userRouter', ['userService', '$state',
function(userService, $state) {
    var serviceAPI = {
        home: function(){
            userService.verifySession()
                .then(function(){
                    if(userService.user === null){
                        $state.go('user.login');
                    }else{
                        $state.go('user.login2');
                    }
                });
        }
    };
    return serviceAPI;
}]);
