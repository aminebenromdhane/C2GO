angular.module('addicaid').directive('filter', [function () {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            defaultFilterItems: '=',
            currentFilterItems: '=',
            onFilterChanged: '&',
            subCategory: '@'
        },
        templateUrl: function(elem, attr){
            return 'template/meeting/directives/'+attr.type+'-filter.html';
        },
        controller: function($scope) {
            var getSelectedFilters = function() {
                var selectedFilters = [];
                angular.forEach($scope.defaultFilterItems, function(item) {
                    if (item.selected) {
                        selectedFilters.push(item.filter);
                    }
                });
                if (selectedFilters.length === 0) {
                    angular.forEach($scope.defaultFilterItems, function(item) {
                        selectedFilters.push(item.filter);
                    });
                }
                return selectedFilters;
            };

            $scope.itemToggle = function(item) {
                item.selected = !item.selected;
                $scope.onFilterChanged({selectedFilters:getSelectedFilters()});
            };

            $scope.resetAll = function() {
                angular.forEach($scope.defaultFilterItems,function(item){
                    item.selected = false;
                });

                if($scope.defaultFilterItems.length !== $scope.currentFilterItems.length){
                    angular.forEach($scope.defaultFilterItems,function(item){
                        if($scope.currentFilterItems.indexOf(item.filter) !== -1){
                            item.selected = true;
                        }
                    });
                }
                $scope.onFilterChanged({selectedFilters:getSelectedFilters()});
            };
            $scope.showItem = function(item){
                return (angular.isUndefined(item.subCategory) || angular.isUndefined($scope.subCategory) || $scope.subCategory == item.subCategory);
            };

            $scope.$watch('currentFilterItems',function(){
                if($scope.defaultFilterItems.length == $scope.currentFilterItems.length){
                    angular.forEach($scope.defaultFilterItems,function(item){
                        item.selected = false;
                    });
                    return;
                }
                angular.forEach($scope.defaultFilterItems,function(item){
                    if($scope.currentFilterItems.indexOf(item.filter) !== -1){
                        item.selected = true;
                    }else{
                        item.selected = false;
                    }
                });
            });

            $scope.resetAll();
        }
    };
}]);