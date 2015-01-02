'use strict';

angular.module('addicaid').filter('distance', ['$filter',function ($filter) {
  return function(input) {
    if(input > 66.66){
      return "Away";
    }
    var distanceDisplay = $filter('number')(input, 1);
    if (distanceDisplay === '1.0') {
      distanceDisplay += ' mile';
    } else {
      distanceDisplay += ' miles';
    }
    return distanceDisplay;
  };
}]);