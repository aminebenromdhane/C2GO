'use strict';


var getHttpsRoot = function(root) {
    return root.replace("http", "https");
};

angular.module('c2go').factory('userService', ['$q', 'UserResource', '$http', 'apiRoot',
function($q, UserResource, $http, apiRoot) {
    var serviceAPI = {
        user: null,
        login: function(user){
            var _this = this;
            var deferred = $q.defer();
            var data = 'j_username=' + user.username + '&j_password=' + user.password;

            $http({
                method: 'POST',
                url: getHttpsRoot(apiRoot) + 'auth/j_spring_security_check',
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
                });
            return deferred.promise;
        }
    };
    return serviceAPI;
}]);
