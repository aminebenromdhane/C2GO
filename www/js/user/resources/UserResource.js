'use strict';

angular.module('c2go').factory('UserResource', ['$resource', 'apiRoot',
    function($resource, apiRoot) {
        return $resource(
            apiRoot + 'auth/:action', {
                action: '@action'
            }, {
                login: {
                    method: 'POST',
                    params: { action: 'j_spring_security_check' }
                }
            });
    }]);