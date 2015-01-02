'use strict';

angular.module('addicaid').factory('geoUtils', ['$cordovaGeolocation', '$timeout',
    function($cordovaGeolocation, $timeout) {
        var serviceAPI = {
            currentPosition: {
                lat: 40.763562,
                lng: -73.97140100000001
            },
            refresh: function(callback){
                if(angular.isUndefined(callback)){
                    callback = function(){};
                }
                var _this = this;
                $cordovaGeolocation
                    .getCurrentPosition()
                    .then(function (position) {
                        _this.currentPosition = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        };
                        console.log(position);
                        callback();
                    }).catch(function(err) {
                        console.log(err);
                    });
            },
            watch: function(){
                var _this = this;
                this.refresh();
                $timeout(function(){
                    _this.refresh();
                },60000);
            }
        };
        return serviceAPI;
    }]);