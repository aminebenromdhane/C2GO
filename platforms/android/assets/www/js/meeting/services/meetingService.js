'use strict';

angular.module('addicaid').factory('meetingService', ['MeetingResource', 'geoUtils',
function(MeetingResource, geoUtils) {
    var serviceAPI = {
        find: function(meetingId, callback){
            var param = {meetingId: meetingId};
            angular.extend(param,{lat: geoUtils.currentPosition.lat});
            angular.extend(param,{lng: geoUtils.currentPosition.lng});

            MeetingResource.get(param).$promise
                .then(function(response) {
                    callback(response.meeting);
                })
                .catch(function(err) {
                    console.log(err);
                });
        }
    };
    return serviceAPI;
}]);