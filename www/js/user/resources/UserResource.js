'use strict';

angular.module('c2go').factory('UserResource', ['$resource', 'apiRoot',
    function($resource, apiRoot) {
        return $resource(
            apiRoot + 'auth/application/x-www-form-urlencoded/:action', {
                action: '@action'
            }, {
                login: {
                    method: 'POST',
                    //headers: { 'Content-type': 'application/x-www-form-urlencoded' },
                    params: { action: 'j_spring_security_check' }
                }
            });
    }]);
// application/x-www-form-urlencoded