'use strict';

angular.module('addicaid').factory('newsService', ['$http', '$sce',
function($http, $sce) {
    var serviceAPI = {
        FEED_URL: 'http://score.addicaid.com/wp-json/posts?filter[category_name]=Dose',
        page: 1,
        news: [],
        indexDailyNews: 0,
        limitReached: false,
        find: function(callback){
            var _this = this;
            $http.get(this.FEED_URL + '&page=' + this.page)
                .then(function(response){
                    if(response.data.length < 10){
                        _this.limitReached = true;
                    }
                    angular.forEach(response.data, function(feed){
                        _this.news.push({
                            title: $sce.trustAsHtml(feed.title),
                            content: $sce.trustAsHtml(feed.content),
                            smallContent: $sce.trustAsHtml(feed.excerpt),
                            image: feed.featured_image.guid
                        });
                    });
                    _this.page++;
                    callback();
                });
        },
        reset: function(){
            this.page = 1;
            this.news = [];
            this.limitReached = false;
            this.indexDailyNews = 0;
        },
        isAtLimit: function(){
            return this.page > 1 && this.limitReached;
        },
        getDailyNews: function(){
            if(this.news.length === 0){
                return null;
            }
            return this.news[this.indexDailyNews];
        }
    };
    return serviceAPI;
}]);