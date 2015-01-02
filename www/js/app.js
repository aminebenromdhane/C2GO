angular.module('c2go', ['ionic', 'ngResource', 'ngCordova', 'ngMaterial'])
    .run(function($ionicPlatform, $cordovaStatusbar) {
      $ionicPlatform.ready(function() {
        if(window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        $cordovaStatusbar.overlaysWebView(true);
        $cordovaStatusbar.styleHex('#FFFFFF');
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
        });

      $urlRouterProvider.otherwise('/');

    });
