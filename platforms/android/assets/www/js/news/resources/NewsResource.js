'use strict';

angular.module('addicaid').factory('NewsResource', ['$resource', 'apiRoot',
function($resource, apiRoot) {
    return $resource(
        apiRoot + 'api/news/:action', {
            action: '@action'
        }, {
            dailyNews: {
                method: 'GET',
                params: { action: 'dailyNews' }
            }
        });
}]);