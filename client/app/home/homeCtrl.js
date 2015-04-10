/**
 * homeCtrl.js
 *
 * This is the controller responsible for the main landing page. 
 */ 

(function(){

  angular
    .module('hackbox')
    .controller('homeCtrl', HomeCtrl);

  HomeCtrl.$inject = ['$scope' ,'$modal', '$log', 'Auth'];

  function HomeCtrl($scope, $modal, $log, Auth){
    /**
     * Function: HomeCtrl.logout()
     * This function will log the user out.
     */
    $scope.logout = function () {
      Auth.logout();
      console.log('Logging out!');
    };


    // Upon loading home, if the user is authenticated
    // Get his list of interviews upcoming. 
    // Populate the list using an ng-repeat and make each div clickable
    // On click, send him to the room/roomId which will make a get request
    // to the server. 
  }
})();
