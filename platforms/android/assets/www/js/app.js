angular.module('addicaid', ['ionic', 'ngResource', 'ngCordova', 'leaflet-directive', 'ngMaterial'])
    //.constant('apiRoot', 'http://dev.addicaid.com/')
    //.constant('apiRoot', 'http://localhost:1337/')
    .constant('apiRoot', 'http://192.168.56.1:1337/')
    .constant('home', 'news.daily')
    .run(function($ionicPlatform, $cordovaStatusbar, geoUtils, notificationNewsService) {
      $ionicPlatform.ready(function() {
        if(window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        $cordovaStatusbar.overlaysWebView(true);
        $cordovaStatusbar.styleHex('#FFFFFF');
        geoUtils.watch();
        notificationNewsService.permission();
        notificationNewsService.watch();
      });
    })

    .config(function($stateProvider, $urlRouterProvider) {

      $stateProvider
        .state('root', {
          url: '/',
          templateUrl: 'template/root/root.html',
          controller: 'RootController as root'
        })



        .state('intro', {
          url: '/intro',
          templateUrl: 'template/intro/intro.html',
          controller: 'IntroController as intro'
        })


        .state('meeting', {
          abstract: true,
          controller: 'MeetingRootController as meetingRootCtrl',
          templateUrl: 'template/meeting/root.html'
        })
        .state('meeting.map', {
          url: '/map',
          templateUrl: 'template/meeting/map.html',
          controller: 'MapController as map'
        })
        .state('meeting.list', {
          url: '/list',
          templateUrl: 'template/meeting/list.html',
          controller: 'ListController as list'
        })
        .state('meeting.filterLocation', {
          url: '/filterLocation',
          templateUrl: 'template/meeting/filterLocation.html',
          controller: 'FilterLocationController as locationCtrl'
        })
        .state('meeting.filters', {
          url: '/filters',
          templateUrl: 'template/meeting/filters.html',
          controller: 'FiltersController as filters'
        })
        .state('meeting.detail', {
          url: '/meeting/:meetingId',
          templateUrl: 'template/meeting/detail.html',
          controller: 'MeetingController as meetingCtrl'
        })


        .state('user', {
          url: "/user",
          abstract: true,
          templateUrl: 'template/user/root.html'
        })
        .state('user.login', {
          url: "/login",
          templateUrl: 'template/user/login.html',
          controller: 'LoginController as loginCtrl'
        })
        .state('user.signup', {
          url: "/signup",
          templateUrl: 'template/user/signup.html',
          controller: 'SignupController as signupCtrl'
        })
        .state('user.logout', {
          url: "/logout",
          controller: 'LogoutController'
        })
        .state('user.profile', {
          url: "/profile",
          templateUrl: 'template/user/profile.html',
          controller: 'ProfileController as profile'
        })


        .state('news', {
          url: "/news",
          abstract: true,
          templateUrl: 'template/news/root.html'
        })
        .state('news.all', {
          url: "/allNews",
          templateUrl: 'template/news/all.html',
          controller: 'AllNewsController as allNews'
        })
        .state('news.daily', {
          url: "/dailyNews",
          templateUrl: 'template/news/daily.html',
          controller: 'DailyNewsController as dailyNewsCtrl'
        });

      $urlRouterProvider.otherwise('/');

    });
