'use strict';

angular.module('addicaid').controller('MeetingController', ['$mdBottomSheet', '$stateParams', 'meetingService', 'mapUtils', '$window', '$cordovaCalendar','$cordovaLocalNotification', '$mdDialog', 'phoneService',
function ($mdBottomSheet, $stateParams, meetingService, mapUtils, $window, $cordovaCalendar, $cordovaLocalNotification, $mdDialog, phoneService) {
    var scope = this;
    this.meeting = {};
    this.marker = [];
    this.center = {};
    this.loading = true;

    meetingService.find($stateParams.meetingId,function(meeting){
        scope.meeting = meeting;
        scope.marker = [mapUtils.createMeetingMarker(meeting)];
        scope.center = {
            lat: meeting.latitude,
            lng: meeting.longitude,
            zoom : 15
        };
        scope.loading = false;
    });

    this.showTag = function($event){
        $mdBottomSheet.show({
            templateUrl: 'template/meeting/tags.html',
            controller: 'TagsController',
            targetEvent: $event
        }).then(function(clickedItem) {

        });
    };

    this.selectDirectionApp = function(){

    };

    this.testDirection = function(){
        //$window.location.href = 'comgooglemaps://?daddr='+this.meeting.latitude+','+this.meeting.longitude;
        $window.location.href = 'geo:38.897096,-77.036545';
    };







    this.confirmAddToCalendar = function(ev){
        var confirm = $mdDialog.confirm()
            .title('Confirmation Adding Meeting')
            .content('Would you like to add this meeting to your calendar?')
            .ariaLabel('Adding Meeting')
            .ok('Add')
            .cancel('Cancel')
            .targetEvent(ev);
        $mdDialog.show(confirm).then(function() {
            scope.addToCalendar(ev);
        }, function() {
        });
    };

    this.addToCalendar = function(ev){

        var testNow = new Date();
        if(testNow.getDay() == this.meeting.dayNumber){
            var testTime = this.meeting.time.split(':');
            if(testNow.getHours() < testTime[0] || (testNow.getHours() == testTime[0] && testNow.getMinutes() < testTime[1])){
                var dd = testNow.getDate();
                var mm = testNow.getMonth();
                var yyyy = testNow.getFullYear();
                if(dd<10) {
                    dd='0'+dd;
                }

                if(mm<10) {
                    mm='0'+mm;
                }
                var hours = testTime[0];
                var minutes = testTime[1];
                var startDate = new Date(yyyy, mm, dd, hours, minutes, 0, 0, 0);
                var endDate = new Date(startDate.getTime());
                endDate.setHours(endDate.getHours()+1);
            }
        }
        if(angular.isUndefined(startDate)){
            for (var firstDateMatch = new Date(); firstDateMatch.setDate(firstDateMatch.getDate()+1) && firstDateMatch.getDay()!=this.meeting.dayNumber; ){}
            var dd = firstDateMatch.getDate();
            var mm = firstDateMatch.getMonth();
            var yyyy = firstDateMatch.getFullYear();

            if(dd<10) {
                dd='0'+dd;
            }

            if(mm<10) {
                mm='0'+mm;
            }
            var time = this.meeting.time.split(':');
            var hours = time[0];
            var minutes = time[1];
            var startDate = new Date(yyyy, mm, dd, hours, minutes, 0, 0, 0);
            var endDate = new Date(startDate.getTime());
            endDate.setHours(endDate.getHours() + 1);
        }
        $cordovaCalendar.createEvent({
            title: this.meeting.title,
            location: this.meeting.address +', '+ this.meeting.city +', '+ this.meeting.state,
            notes: this.meeting.notes,
            startDate: startDate,
            endDate: endDate
        }).then(function (result) {
            $mdDialog.show(
                $mdDialog.alert()
                    .title('Meeting Added')
                    .content('This Meeting has added to your calendar.')
                    .ariaLabel('Meeting Added')
                    .ok('Got it!')
                    .targetEvent(ev)
            );
            console.log(result);
        }, function (err) {
            console.log(err);
        });
    };
}]);