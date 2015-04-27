/**
 * pastCtrl.js
 *
 * This is the controller responsible for the past interviews page. 
 */ 

(function(){

  angular
    .module('hackbox')
    .controller('404Ctrl', ErrorCtrl);

  ErrorCtrl.$inject = ['$scope' ,'$modal', '$state','$log', 'Auth', 'Room'];

  function ErrorCtrl($scope, $modal, $state, $log, Auth, Room){
    $scope.showCreateInterview = false;
    $scope.showLoadingCreateInterview = false;
    $scope.showLogout = false;
    $scope.newInterview = {};

    /**
     * Function: 404Cntrl.init()
     * This function will initialize the home page. If the user is logged in,
     * they will see a list of interviews coming up. Otherwise nothing. 
     */
    $scope.init = function(){
      // Check if the user is logged in
      Auth.isAuthenticated().then(function(response){
        if(response.data){
          console.log("User is logged in, display logout.")
          $scope.showLogout = true;
        }
        else{
          console.log('User is not logged in');
        }
      });
    };

    /**
     * Function: 404Ctrl.logout()
     * This function will log the user out.
     */
    $scope.logout = function () {
      Auth.logout().then(function(){
        $scope.showLogout = false;
      });
      console.log('Logging out!');
    };

    $scope.init();
  }
})();
