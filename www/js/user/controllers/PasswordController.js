'use strict';


angular.module('c2go').controller('PasswordController', ['$scope', 'userService', '$state',
function($scope, userService, $state) {
    var _this          = this;
    this.user          = null;
    this.error         = null;

    this.changePassword = function() {
        if(_this.user.newPassword !== _this.user.newPassword2) {
            _this.error = "Second new password don't much first one";
        } else {
            userService.verifySession()
                .then(function(){
                    if(userService.user === null){
                        _this.error = "You have to be logged in first";
                    }else{
                        _this.user.username = userService.user.username;
                        userService.login(_this.user)
                            .then(function() {
                                userService.changePassword(_this.user)
                                    .then(function(){
                                        console.log("change password success");
                                        //TODO tell user that "change password success"
                                        $state.go('user.profile');
                                    })
                                    .catch(function(err){
                                        _this.error = err;
                                    });
                            })
                            .catch(function(err){
                                _this.error = "Wrong old password";
                            });
                    }
                });
        }
    }

}]);
