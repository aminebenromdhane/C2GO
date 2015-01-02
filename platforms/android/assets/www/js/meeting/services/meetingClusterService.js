'use strict';

angular.module('addicaid').factory('meetingClusterService', ['MeetingResource', 'meetingFilterService', 'geoUtils',
function(MeetingResource, meetingFilterService, geoUtils) {
    var serviceAPI = {
        detailPoint: {},
        detailedMeetings: [],
        findDetailMeeting: function(callback){
            var self = this;
            var param = this.detailPoint;
            angular.extend(param, meetingFilterService.getFilterParams());
            angular.extend(param,{lat: geoUtils.currentPosition.lat});
            angular.extend(param,{lng: geoUtils.currentPosition.lng});

            MeetingResource.cluster(param).$promise
            .then(function(response) {
                self.detailedMeetings = response.data;
                callback();
            })
            .catch(function(err) {
                callback(err);
            });

        }
    };
    return serviceAPI;
}]);