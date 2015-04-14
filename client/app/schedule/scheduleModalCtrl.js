/**
 * scheduleModalCtrl.js
 *
 * This is the controller responsible for the schedule Modal that appears when
 * the new interview button is clicked. 
 */

(function(){

  angular
    .module('hackbox')
    .controller('scheduleModalCtrl', ScheduleModalCtrl);

  ScheduleModalCtrl.$inject = ['$scope','$modalInstance', 'Room', '$state'];

  function ScheduleModalCtrl($scope, $modalInstance, Room, $state){
    $scope.loading = false;

    /**
     * Function: HomeCtrl.createInterview()
     * This function will create a new interview. It calls refresh to update the DOM
     * with the list of all interviews for the user. 
     */
    $scope.createInterview = function() {
      $scope.showLoadingCreateInterview = true;
      Room.createRoom($scope.newInterview, function(){
        $scope.showLoadingCreateInterview = false;
        $scope.newInterview.name = null;
        $scope.newInterview.email = null;
        $scope.newInterview.time = null;
        $modalInstance.dismiss('cancel');
        $scope.refreshInterviews();
      });
    };

    $scope.showLoading = function(){
      $scope.loading = true;
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }
})();