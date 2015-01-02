'use strict';

angular.module('addicaid').factory('userService', ['$q', 'UserResource',
function($q, UserResource) {
    var serviceAPI = {
        user: null,
        login: function(user){
            var _this = this;
            var deferred = $q.defer();

            UserResource.login(user).$promise
                .then(function(response) {
                    _this.user = response.user;
                    deferred.resolve();
                })
                .catch(function(err) {
                    console.log(err);
                    deferred.reject('Username or password is invalid');
                });
            return deferred.promise;
        },
        logout: function(){
            var _this = this;
            var deferred = $q.defer();

            UserResource.logout().$promise
                .then(function(response) {
                    _this.user = null;
                    deferred.resolve();
                })
                .catch(function(err) {
                    deferred.reject();
                });
            return deferred.promise;
        },
        isLogIn: function(){
            return this.user != null;
        }
    };
    return serviceAPI;
}]);