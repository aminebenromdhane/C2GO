'use strict';

angular.module('addicaid').factory('phoneService', ['$window',
    function($window) {
        var serviceAPI = {
            type: function(){
                var ua = $window.navigator.userAgent.toLowerCase();

                var phoneCheck = {
                    ios          : ua.match(/(iphone|ipod|ipad)/i),
                    blackberry   : ua.match(/blackberry/i),
                    android      : ua.match(/android/i),
                    windows : ua.match(/windows phone/i)
                };
                return phoneCheck;
            }
        };
        return serviceAPI;
    }]);