'use strict';

angular.module('addicaid').factory('MeetingResource', ['$resource', 'apiRoot',
function($resource, apiRoot) {
    return $resource(
        apiRoot + 'api/meeting/:action', {
            action: '@action'
        }, {
            get: {
                method: 'GET',
                params: { action: 'get' }
            },
            map: {
                method: 'POST',
                params: { action: 'map' }
            },
            list: {
                method: 'POST',
                params: { action: 'list' }
            },
            cluster: {
                method: 'POST',
                params: { action: 'cluster' }
            }
        });
}]);