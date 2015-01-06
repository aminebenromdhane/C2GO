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
        })

        .state('launch', {
          url: '/launch',
          templateUrl: 'template/launch/launch.html',
          controller: 'LaunchController as launch'
        })

        .state('login', {
          url: '/login',
          templateUrl: 'template/login/login.html',
          controller: 'LoginController as login'
        })

        .state('activationPromt', {
          url: '/activationPromt',
          templateUrl: 'template/activationPromt/activationPromt.html',
          controller: 'ActivationPromtController as activationPromt'
        })

        .state('createAccount', {
          url: '/createAccount',
          templateUrl: 'template/createAccount/createAccount.html',
          controller: 'CreateAccountController as createAccount'
        })

        .state('accountTerms', {
          url: '/accountTerms',
          templateUrl: 'template/accountTerms/accountTerms.html',
          controller: 'AccountTermsController as accountTerms'
        })

        .state('createConfirmation', {
          url: '/createConfirmation',
          templateUrl: 'template/createConfirmation/createConfirmation.html',
          controller: 'CreateConfirmationController as createConfirmation'
        })

        .state('home', {
          url: '/home',
          templateUrl: 'template/home/home.html',
          controller: 'HomeController as home'
        })

        .state('specialDetails', {
          url: '/specialDetails',
          templateUrl: 'template/specialDetails/specialDetails.html',
          controller: 'SpecialDetailsController as specialDetails'
        })

        .state('promoFilter', {
          url: '/promoFilter',
          templateUrl: 'template/promoFilter/promoFilter.html',
          controller: 'PromoFilterController as promoFilter'
        })

        .state('transactions', {
          url: '/transactions',
          templateUrl: 'template/transactions/transactions.html',
          controller: 'TransactionsController as transactions'
        })

      ;

      $urlRouterProvider.otherwise('/');

    });
