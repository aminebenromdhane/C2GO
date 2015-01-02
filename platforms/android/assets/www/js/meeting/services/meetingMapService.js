'use strict';

angular.module('addicaid').factory('meetingMapService', ['MeetingResource', 'meetingFilterService', 'geoUtils',
function(MeetingResource, meetingFilterService, geoUtils) {
    var serviceAPI = {
        _bounds: {},
        center: {
            lat: geoUtils.currentPosition.lat,
            lng: geoUtils.currentPosition.lng,
            zoom : 15
        },
        newPosition: null,
        meetings: [],
        meetingClusters: [],
        _getPositionFromBounds: function(bounds){
            var boundParam = {};
            boundParam.south = bounds.southWest.lat;
            boundParam.west = bounds.southWest.lng;
            boundParam.north = bounds.northEast.lat;
            boundParam.east = bounds.northEast.lng;

            return boundParam;
        },
        _getBoundsFromPosition: function(){
            var position = {
                southWest : {},
                northEast: {}
            };

            position.southWest.lat = this._bounds.south;
            position.southWest.lng = this._bounds.west;
            position.northEast.lat = this._bounds.north;
            position.northEast.lng = this._bounds.east;

            return position;
        },
        _getSearchParam: function(){
            var param = this._bounds;
            angular.extend(param,{origin: 'mobile'});
            angular.extend(param, meetingFilterService.getFilterParams());
            angular.extend(param,{lat: geoUtils.currentPosition.lat});
            angular.extend(param,{lng: geoUtils.currentPosition.lng});

            return param;
        },
        findMeetings: function(callback){
            var self = this;
            var param = this._getSearchParam();

            MeetingResource.map(param).$promise
            .then(function(response) {
                self.meetingClusters = response.groups.groups;
                self.meetings = response.groups.solo;
                callback();
            })
            .catch(function(err) {
                callback(err);
            });
        },
        setMapBounds: function(newBounds){
            this._bounds = this._getPositionFromBounds(newBounds);
        },
        getBounds: function(){
            return this._getBoundsFromPosition();
        }
    };
    return serviceAPI;
}]);