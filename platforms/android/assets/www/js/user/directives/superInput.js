angular.module('addicaid').directive('superInput', ['$mdTheming', '$mdUtil', function ($mdTheming, $mdUtil) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            label: '@',
            value: '=ngModel',
            status: '@',
            errorMessage: '@',
            type: '@'
        },
        compile : function(element, attr) {
            if ( angular.isUndefined(attr.mdFid) ) {
                attr.mdFid = $mdUtil.nextUid();
            }

            return {
                pre : function(scope, element, attrs) {

                },
                post: $mdTheming
            };
        },
        templateUrl: 'template/user/directives/superInput.html'
    };
}]);