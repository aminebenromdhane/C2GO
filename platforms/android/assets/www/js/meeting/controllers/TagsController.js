'use strict';

angular.module('addicaid').controller('TagsController', ['$scope', '$mdBottomSheet',
function ($scope, $mdBottomSheet) {
    $scope.tags = [
        {title: 'Young People'},
        {title: 'Old Timers'},
        {title: 'Snacks + Coffee'},
        {title: 'Fellowship'},
        {title: 'Great meeting spot'},
        {title: 'Big Group'},
        {title: 'Small Group'},
        {title: 'Dogs Allowed'}
    ];
    $scope.done = function() {
        $mdBottomSheet.hide();
    };

}]);