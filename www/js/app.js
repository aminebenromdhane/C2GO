angular.module('c2go', ['ionic', 'ngResource', 'ngCordova', 'ngMaterial'])
    .run(function($ionicPlatform, $cordovaStatusbar) {
      $ionicPlatform.ready(function() {
        if(window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
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

        .state('launch', {
          url: '/launch',
          templateUrl: 'template/launch/launch.html',
          controller: 'LaunchController as launch'
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
          templateUrl: 'template/user/signup.html'
        })
        .state('user.signup2', {
          url: "/signup2",
          templateUrl: 'template/user/signup2.html'
        })
        .state('user.logout', {
          url: "/logout",
          controller: 'LogoutController'
        })




        .state('payment', {
          url: "/payment",
          abstract: true,
          templateUrl: 'template/payment/root.html'
        })
        .state('payment.selectRecipient', {
          url: "/selectRecipient",
          templateUrl: 'template/payment/selectRecipient.html'
        })
        .state('payment.send', {
          url: "/send",
          templateUrl: 'template/payment/send.html'
        })
        .state('payment.history', {
          url: "/history",
          templateUrl: 'template/payment/history.html'
        });

      $urlRouterProvider.otherwise('/');

    });
