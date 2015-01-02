'use strict';

angular.module('addicaid').factory('UserResource', ['$resource', 'apiRoot',
function($resource, apiRoot) {
    return $resource(
        apiRoot + 'api/user/:action', {
            action: '@action'
        }, {
            login: {
                method: 'POST',
                params: { action: 'login' }
            },
            logout: {
                method: 'GET',
                params: { action: 'logout' }
            }
        });
}]);