'use strict';

angular.module('addicaid').factory('dailyNewsService', ['NewsResource', '$sce', '$q',
function(NewsResource, $sce, $q) {
    var serviceAPI = {
        news: [],
        total: 1,
        find: function(){
            var _this = this;
            var deferred = $q.defer();
            NewsResource.dailyNews({position: this.news.length}).$promise
                .then(function(response){
                    var image = new Image();
                    image.src = response.news[0].imageUrl;
                    if (image.complete) {
                        _this.addNews(response.news[0], response.total);
                        deferred.resolve();
                    } else {
                        image.addEventListener('load', function() {
                            _this.addNews(response.news[0], response.total);
                            deferred.resolve();
                        });
                        image.addEventListener('error', function() {
                            console.log('error');
                            deferred.reject();
                        });
                    }
                })
                .catch(function(err){
                    console.log(err);
                    deferred.reject(err);
                });
            return deferred.promise;
        },
        addNews: function(currentNews, total){
            this.news.unshift({
                title: $sce.trustAsHtml(currentNews.title),
                content: $sce.trustAsHtml(currentNews.fullDescription),
                smallContent: $sce.trustAsHtml(currentNews.smallDescription),
                image: currentNews.imageUrl
            });
            this.total = total;
        },
        isFinished: function(){
            return this.total === this.news.length;
        },
        reset: function(){
            this.news = [];
            this.total = 1;
        }
    };
    return serviceAPI;
}]);