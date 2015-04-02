(function(){

  var app = angular.module('hackbox', ['ui.router']);

  app.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
      $urlRouterProvider.otherwise('/');
      $stateProvider
        .state('home', {
            url: '/',
            controller: 'HomeCtrl',
            templateUrl: 'app/home/home.html',
        });
  });
  console.log('App loaded successfully');
})();
