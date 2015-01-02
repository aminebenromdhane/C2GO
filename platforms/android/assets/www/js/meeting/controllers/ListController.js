'use strict';

angular.module('addicaid').controller('ListController', ['$scope', 'meetingListService',
function ($scope, meetingListService) {

    var scope = this;
    this.meetings = meetingListService.meetings;
    this.totalMeetings = meetingListService.total;
    this.init = true;
    this.loading = false;
    this.sort = {
        nearest: meetingListService.sort == 'nearest',
        soonest: meetingListService.sort == 'soonest',
        popular: meetingListService.sort == 'popular'
    };
    this.query = '';

    this.loadMore = function(){
        if(this.init){
            this.loading = true;
        }
        this.init = false;
        meetingListService.findMeetings(function(){
            scope.meetings = meetingListService.meetings;
            scope.totalMeetings = meetingListService.total;
            scope.loading = false;
            $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    };

    this.canLoadMore = function(){
        return meetingListService.total > meetingListService.meetings.length;
    };

    this.changeSort = function(category){
        if(this.sort[category]){
            return;
        }
        angular.forEach(this.sort, function(value, key){
            if(value){
                scope.sort[key] = false;
            }
        });
        scope.sort[category] = true;
        meetingListService.sort = category;
        meetingListService.reset();
        this.init = true;
        this.loadMore();
    };
    this.search = function(){
        if(this.query.length < 2){
            if(meetingListService.keyword !== null){
                meetingListService.keyword = null;
                meetingListService.reset();
                this.init = true;
                this.loadMore();
            }
            meetingListService.keyword = null;
            return;
        }
        meetingListService.keyword = this.query;
        meetingListService.reset();
        this.init = true;
        this.loadMore();
    };
    meetingListService.reset();
    this.loadMore();

}]);