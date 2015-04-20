(function(){

  var app = angular.module('hackbox', ['ui.router', 'ui.bootstrap']);

  app.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
      $urlRouterProvider.otherwise('/');

      var authenticated = ['$q', 'Auth', function ($q, Auth) {
              var deferred = $q.defer();
              Auth.isAuthenticated()
                .then(function (response) {
                  if (response.data) {
                    deferred.resolve();
                  } else {
                    deferred.reject('Not logged in');
                  }
                });
              return deferred.promise;
            }];

      var access = ['$state', '$stateParams', '$q', 'Room', function($state, $stateParams, $q, Room){
        var deferred = $q.defer();
        Room.access($stateParams.roomId, function(response) {
            // if the room is accessible, resolve the promise and continue access to the room
            if(response.data.access) {
              console.log('Room is accessible');
              deferred.resolve()
            // if the room is not accessible, reject the promise and change the state to 404
            } else {
              console.log('Room is not accessible');
              deferred.reject('Room is not accessible');
              $state.go('404');
            }
          });
          return deferred.promise;
      }];

      // Register all states for the application
      $stateProvider
        .state('home', {
            url: '/',
            controller: 'homeCtrl',
            templateUrl: 'app/home/home.html',
        })
        .state('room', {
            url: '/room/:roomId',
            controller: 'roomCtrl',
            templateUrl: 'app/room/room.html',
            resolve: {
              access: access
            }
        })
        .state('404', {
          url: '/404',
          controller: '404Ctrl',
          templateUrl: 'app/404/404.html'
        })
        .state('demo', {
            url: '/demo/:roomId',
            controller: 'roomCtrl',
            templateUrl: 'app/room/room.html',
            resolve: {
              access: access
            }
        });
        // Attach token to all requests
        // $httpProvider.interceptors.push('AttachTokens');
  })
  
  .run(function ($rootScope, $state, $log) {
    $rootScope.$on('$stateChangeError', function () {
      // Redirect user to our home page
      $state.go('home', {reload: true});
    });
  });
  console.log('App loaded successfully');
})();
