'use strict';

angular.module('addicaid').controller('FiltersController', ['$scope', '$state', 'meetingFilterService', 'filterUtils', 'meetingListService',
function ($scope, $state, meetingFilterService, filterUtils, meetingListService) {

    var scope = this;
    this.dayFilterItems = filterUtils.dayFilterItems;
    this.fellowshipFilterItems = filterUtils.fellowshipFilterItems;
    this.timeFilterItems = filterUtils.timeFilterItems;

    this.onFilterChange = function(selectedFilters, type){
        this.tempFilters[type] = selectedFilters;
    };

    this.reset = function(){
        this.tempFilters = {
            day: meetingFilterService.dayFilter,
            fellowship: meetingFilterService.fellowshipFilter,
            time: meetingFilterService.timeFilter
        };
    };

    this.apply = function(){
        meetingFilterService.dayFilter = this.tempFilters.day;
        meetingFilterService.fellowshipFilter = this.tempFilters.fellowship;
        meetingFilterService.timeFilter = this.tempFilters.time;
        meetingListService.reset();
        $state.go('meeting.map');
    };

    this.reset();
}]);