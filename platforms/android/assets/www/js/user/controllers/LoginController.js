'use strict';

angular.module('addicaid').controller('LoginController', ['userService', '$state',
function (userService, $state) {
    var _this = this;
    this.user = {};
    this.loading = false;
    this.error = null;

    this.username = {
        status: 0,
        message: ''
    };
    this.password = {
        status: 0,
        message: ''
    };

    this.login = function(){
        if(!this.validate()){
            return;
        }
        this.loading = true;
        userService.login(this.user).then(
            function(){
                _this.loading = false;
                _this.error = null;
                $state.go('user.profile');
            },
            function(err){
                _this.error = err;
                _this.loading = false;
            }
        );
    };

    this.validate = function(){
        var valid = true;
        this.username.status = 0;
        this.password.status = 0;

        if(this.user.username === '' || angular.isUndefined(this.user.username)){
            this.username.message = 'Username cannot be blank';
            this.username.status = -1;
            valid = false;
        }

        if(this.user.password === '' || angular.isUndefined(this.user.password)){
            this.password.message = 'Password cannot be blank';
            this.password.status = -1;
            valid = false;
        }
        return valid;
    };

}]);