'use strict';

angular.module('addicaid').controller('MapController', ['$scope', 'mapUtils', 'meetingMapService', 'meetingClusterService', 'leafletData', 'geoUtils',
function($scope, mapUtils, meetingMapService, meetingClusterService, leafletData, geoUtils) {
    var scope = this;
    this.markers = [];
    this.locationMarker = geoUtils.currentPosition;
    this.currentMeeting = null;
    this.center = meetingMapService.center;
    this.events = {
        map: {
            enable: ['load'],
            logic: 'emit'
        },
        markers: {
            enable: ['click'],
            logic: 'emit'
        }
    };
    this.layers = {
        baselayers: {
            osm: {
                name: 'OpenStreetMap',
                    url: 'https://{s}.tiles.mapbox.com/v3/ws-fegon.ipm796he/{z}/{x}/{y}.png',
                    type: 'xyz'
            }
        }
    };
    this.defaultMapOptions = {
        zoomControl:false
    };
    mapUtils.mapId = document.getElementById('leafletMap');

    $scope.$on('leafletDirectiveMap.load', function(event){
        if(meetingMapService.newPosition !== null){
            scope.bounds = meetingMapService.newPosition;
            meetingMapService.newPosition = null;
        }
    });

    $scope.$on('leafletDirectiveMarker.click', function(event, args){
        var marker = scope.markers[args.markerName];
        if(marker.isCluster){
            if(marker.isOneLocation){
                scope.updateDetailCluster(marker.cluster.center);
                scope.markers.splice(args.markerName, 1);
            }else{
                scope.bounds = marker.maxBounds;
            }
        }else{
            scope.currentMeeting = marker.meeting;
            marker.meeting.isClicked = true;
        }
    });

    $scope.$watch(angular.bind(this, function (bounds) {
        return this.bounds;
    }), function (bounds) {
        if (bounds) {
            scope.updateMapBounds();
        }
    });

    this.initMarkers = function(){
        this.markers = [this.locationMarker];
    };

    this.loadMarkerData = function() {
        var clusters = meetingMapService.meetingClusters;
        var meetings = meetingMapService.meetings;
        this.initMarkers();
        angular.forEach(clusters, function(cluster){
            scope.markers.push(mapUtils.createClusterMarker(cluster));
        });
        angular.forEach(meetings, function(meeting){
            scope.markers.push(mapUtils.createMeetingMarker(meeting));
        });
    };
    this.loadDetailsMarkerData = function(){
        leafletData.getMap().then(function(map) {
            var meetings = meetingClusterService.detailedMeetings;
            var circle = mapUtils.generatePointsCircle(meetings.length,
                map.latLngToLayerPoint(L.latLng(meetings[0].latitude, meetings[0].longitude)));
            angular.forEach(meetings, function(meeting, i){
                var circlePoint = map.layerPointToLatLng(circle[i]);
                meeting.latitude = circlePoint.lat;
                meeting.longitude = circlePoint.lng;
                scope.markers.push(mapUtils.createMeetingMarker(meeting));
            });
        });
    };

    this.updateMapBounds = function() {
        meetingMapService.setMapBounds(this.bounds);
        meetingMapService.center = this.center;
        meetingMapService.findMeetings(function(){
            scope.loadMarkerData();
        });
    };

    this.updateDetailCluster = function(point) {
        meetingClusterService.detailPoint = {latitude: point.latitude, longitude: point.longitude};
        meetingClusterService.findDetailMeeting(function(){
            scope.loadDetailsMarkerData();
        });
    };
}]);