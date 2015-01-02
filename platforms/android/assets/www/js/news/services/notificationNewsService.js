'use strict';

angular.module('addicaid').factory('notificationNewsService', ['$http', '$cordovaLocalNotification', '$timeout',
    function($http, $cordovaLocalNotification, $timeout) {
        var serviceAPI = {
            FEED_URL: 'http://score.addicaid.com/wp-json/posts?filter[category_name]=Dose',
            fetch: function(){
                $http.get(this.FEED_URL).then(function(response){
                    var latestNews = response.data[0];
                    $cordovaLocalNotification.add({
                        id: 'addicaidnewsdailynotification',
                        message: latestNews.excerpt,
                        title: latestNews.title
                    }).then(function () {
                        console.log('callback for adding background notification');
                    });
                });
            },
            watch: function(){
                var _this = this;
                $timeout(function(){
                    _this.fetch();
                },60000);
            },
            permission: function(){
                $cordovaLocalNotification.hasPermission().then(function(granted) {
                    $cordovaLocalNotification.cancelAll();
                    if (!granted) {
                        $cordovaLocalNotification.promptForPermission();
                    }
                });
            }
        };
        return serviceAPI;
    }]);