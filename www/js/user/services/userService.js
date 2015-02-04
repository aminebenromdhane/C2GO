'use strict';

angular.module('c2go').factory('userService', ['$q', 'UserResource', '$http', 'apiRoot',
function($q, UserResource, $http, apiRoot) {
    var serviceAPI = {
        user: null,
        login: function(user){
            var _this = this;
            var deferred = $q.defer();

            /*var data = 'j_username=' + user.username + '&j_password=' + user.password;
            $http({
                method: 'POST',
                url: apiRoot + 'auth/j_spring_security_check',
                data: data,
                //data: {'j_username': user.username,  'j_password': user.password},
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })

//            UserResource.login({'j_username': user.username,  'j_password': user.password}).$promise
                .then(function(response) {
                    _this.user = {
                        username: 'sfrons%40productivemachine.com'
                    };
                    deferred.resolve();
                })
                .catch(function(err) {
                    console.log(err);
                    deferred.reject('Username or password is invalid');
                });*/
            $http({
                url: "https://test.c2gocard.com/auth/j_spring_security_check",
                method: "POST",
                data: {"j_username":"sfrons@productivemachine.com", "j_password":"test"}
            }).success(function(data, status, headers, config) {
                deferred.resolve(data);
            }).error(function(data, status, headers, config) {
                deferred.resolve(status);
            });
            return deferred.promise;
        }
    };
    return serviceAPI;
}]);