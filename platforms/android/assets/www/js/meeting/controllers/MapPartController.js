'use strict';

angular.module('addicaid').controller('MapPartController', ['$scope',
function($scope) {
    var scope = this;

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
        zoomControl: false,
        dragging: false,
        touchZoom: false,
        doubleClickZoom: false,
        boxZoom: false,
        tap: false
    };
}]);