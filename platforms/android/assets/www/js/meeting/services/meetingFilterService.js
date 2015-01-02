'use strict';

angular.module('addicaid').factory('meetingFilterService', [
function() {
    var serviceAPI = {
        fellowshipFilter: ["NA", "AA", "CMA", "MA", "CA", "OA", "EDA", "CODA", "Al-Anon", "GA", "SAA", "SLAA", "DA", "NicA", "Alateen", "ACA", "SMART", "COSA", "SA", "SCA"],
        dayFilter: [1,2,3,4,5,6,0],
        timeFilter: ["morning","afternoon","evening","night"],
        getFilterParams: function(){
            var param = {
                fellowship: this.fellowshipFilter,
                day: this.dayFilter,
                time: this.timeFilter
            };
            return param;
        }
    };
    return serviceAPI;
}]);