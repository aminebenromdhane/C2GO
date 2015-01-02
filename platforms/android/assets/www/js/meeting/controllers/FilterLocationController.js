'use strict';

angular.module('addicaid').controller('FilterLocationController', ['meetingMapService', '$state', 'mapUtils', 'geoUtils', 'meetingListService',
function (meetingMapService, $state, mapUtils, geoUtils, meetingListService) {
    var scope = this;

    this.locations = [{
        description: "New York, NY",
        place_id: "ChIJOwg_06VPwokRYv534QaPC8g"
    },{
        description: 'Los Angeles, CA',
        place_id: "ChIJE9on3F3HwoAR9AhGJW_fL-I"
    }];
    this.whereTo = null;
    this.autocompleteService = new google.maps.places.AutocompleteService();

    this.findLocations = function(){
        if(this.whereTo == null){
            return;
        }
        this.autocompleteService.getPlacePredictions({ input: this.whereTo, componentRestrictions: {country: 'us'} },
            function(predictions, status){
                if (status != google.maps.places.PlacesServiceStatus.OK) {
                    return;
                }
                scope.locations = predictions;
            }
        );
    };

    this.pickLocation = function(location){
        var service = new google.maps.places.PlacesService(mapUtils.mapId);
        service.getDetails({placeId: location.place_id},
          function(place, status){
              var bounds = {};
              bounds.northEast = {lat: place.geometry.viewport.Ea.j, lng: place.geometry.viewport.wa.j};
              bounds.southWest = {lat: place.geometry.viewport.Ea.k, lng: place.geometry.viewport.wa.k};
              meetingMapService.newPosition = bounds;
              var position = {
                  lat: place.geometry.location.k,
                  lng: place.geometry.location.B
              };
              scope.updateListLocation(position);
              scope.skip();
          }
        );
    };

    this.pickCurrentLocation = function(){
        geoUtils.refresh(function(){
            meetingMapService.center = geoUtils.currentPosition;
            meetingMapService.center.zoom = 15;
            scope.updateListLocation(geoUtils.currentPosition);
            scope.skip();
        });
    };

    this.skip = function(){
        $state.go('meeting.filters');
    };

    this.updateListLocation = function(position){
        meetingListService.position = position;
        meetingListService.reset();
    };
}]);