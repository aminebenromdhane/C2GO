'use strict';

angular.module('addicaid').controller('UploadChoiceController', ['$scope', '$mdDialog',
    function ($scope, $mdDialog) {
        $scope.done = function(choice) {
            $mdDialog.hide(choice);
        };
    }]);