'use strict';

angular.module('c2go').controller('LoginController', ['$scope', 'userService',
  function($scope, userService) {
    var _this = this;
    this.user  = null;
    this.error = null;

    this.login = function(){
      this.error = null;
      userService.login(this.user)
          .then(function(){

          })
          .catch(function(err){
            _this.error = err;
          });
    };

  }]);