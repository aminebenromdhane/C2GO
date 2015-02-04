'use strict';

angular.module('c2go').controller('LoginController', ['$scope', 'userService', '$state',
  function($scope, userService, $state) {
    var _this = this;
    this.user  = null;
    this.error = null;

    this.login = function(){
      this.error = null;
      userService.login(this.user)
          .then(function(){
              $state.go('user.login2');
          })
          .catch(function(err){
            _this.error = err;
          });
    };

  }]);