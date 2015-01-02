'use strict';

angular.module('addicaid').controller('AllNewsController', ['$scope', 'newsService',
function ($scope, newsService) {
    var _this = this;
    this.news = newsService.news;

    this.loadMore = function(){
        newsService.find(function(){
            _this.news = newsService.news;
            $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    };

    this.canLoadMore = function(){
        return !newsService.isAtLimit();
    };
}]);