'use strict';

angular.module('addicaid').factory('meetingListService', ['MeetingResource', 'meetingFilterService', 'geoUtils',
function(MeetingResource, meetingFilterService, geoUtils) {
    var serviceAPI = {
        meetings: [],
        page: 0,
        total: 0,
        position: geoUtils.currentPosition,
        keyword: null,
        sort: 'nearest',
        findMeetings: function(callback){
            var self = this;
            var param = meetingFilterService.getFilterParams();
            angular.extend(param,{page: this.page});
            angular.extend(param,{pageSize: 15});
            angular.extend(param,{lat: this.position.lat});
            angular.extend(param,{lng: this.position.lng});
            angular.extend(param,{sort: this.sort});
            angular.extend(param,{now: new Date()});
            if(this.keyword !== null){
                angular.extend(param,{keyword: this.keyword});
            }

            MeetingResource.list(param).$promise
            .then(function(response) {
                self.meetings = self.meetings.concat(response.data);
                self.total = response.total;
                self.page++;
                callback();
            })
            .catch(function(err) {
                console.log(err);
            });
        },
        reset: function(){
            this.page = 0;
            this.meetings = [];
            this.total = 0;
        }
    };
    return serviceAPI;
}]);