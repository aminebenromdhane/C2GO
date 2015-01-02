'use strict';

angular.module('addicaid').controller('DailyNewsController', ['dailyNewsService', '$ionicSlideBoxDelegate', '$timeout',
function (dailyNewsService, $ionicSlideBoxDelegate, $timeout) {
    var _this = this;
    this.loading = {
        current: false,
        prev: false
    };
    this.currentPosition = 0;

    dailyNewsService.reset();
    this.news = dailyNewsService.news;

    this.hasPrev = function(){
        return !dailyNewsService.isFinished();
    };

    this.hasNext = function(){
        return this.currentPosition < dailyNewsService.news.length - 1;
    };

    this.next = function(){
        $ionicSlideBoxDelegate.next();
    };

    this.prev = function(){
        $ionicSlideBoxDelegate.previous();
    };

    this.slideHasChanged = function($index){
        this.currentPosition = $index;
        if($index === 0){
            this.loading.prev = true;
            dailyNewsService.find()
                .then(function(){
                    _this.loading.prev = false;
                    _this.news = dailyNewsService.news;
                    _this.currentPosition = $index + 1;
                    $ionicSlideBoxDelegate.update();
                });
        }
    };

    if(this.news.length === 0){
        this.loading.current = true;
        dailyNewsService.find()
            .then(function(){
                _this.news = dailyNewsService.news;
                $ionicSlideBoxDelegate.update();
                _this.loading.current = false;
                _this.slideHasChanged(0);
            });
    }

}]);