'use strict';

angular.module('c2go').factory('userService', ['$q', 'UserResource', 'apiRoot', '$http',
function($q, UserResource, apiRoot, $http) {
    var serviceAPI = {
        user: null,
        login: function(user){
            var _this = this;
            var deferred = $q.defer();

            $.ajax({
                url : apiRoot + "j_spring_security_check",
                type: "POST",
                data : {"j_username":user.username, "j_password":user.password},
                success: function(data, textStatus, jqXHR) {
                    console.log(data);
                    if(data.indexOf('The username and password combination you provided did not match our records.  Please try again.') === -1){
                        _this.user = {
                            username: 'sfrons@productivemachine.com'
                        };
                        deferred.resolve();
                    }else{
                        deferred.reject('The username and password combination you provided did not match our records');
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                }
            });
            return deferred.promise;
        },
        verifySession: function(){
            var _this = this;
            $http.get(apiRoot + 'CardApplication')
                .then(function(data){
                    console.log(data);
                    if(data.indexOf('login') === -1){
                        _this.user = {
                            username: 'sfrons@productivemachine.com'
                        };
                    }
                },function(err){
                    console.log(err);
                });
        }
    };
    return serviceAPI;
}]);
