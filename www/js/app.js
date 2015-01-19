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
        .state('user.login2', {
          url: "/login2",
          templateUrl: 'template/user/login2.html'
        })

        .state('user.signup', {
          url: "/signup",
          templateUrl: 'template/user/signup.html'
        })
        .state('user.signup2', {
          url: "/signup2",
          templateUrl: 'template/user/signup2.html'
        })
        .state('user.signup3', {
          url: "/signup3",
          templateUrl: 'template/user/signup3.html'
        })

        .state('user.profile', {
          url: "/profile",
          templateUrl: 'template/user/profile.html'
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
        .state('payment.sendMoney', {
          url: "/sendMoney",
          templateUrl: 'template/payment/sendMoney.html'
        })
        .state('payment.sendMoney2', {
          url: "/sendMoney2",
          templateUrl: 'template/payment/sendMoney2.html'
        })
        .state('payment.splitCommission', {
          url: "/splitCommission",
          templateUrl: 'template/payment/splitCommission.html'
        })
        .state('payment.splitCommission2', {
          url: "/splitCommission",
          templateUrl: 'template/payment/splitCommission2.html'
        })
        .state('payment.splitCommission3', {
          url: "/splitCommission",
          templateUrl: 'template/payment/splitCommission3.html'
        })
        .state('payment.history', {
          url: "/history",
          templateUrl: 'template/payment/history.html'
        });

      $urlRouterProvider.otherwise('/');

    });
