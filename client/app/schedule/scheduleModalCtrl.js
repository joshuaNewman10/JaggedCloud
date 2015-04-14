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

  ScheduleModalCtrl.$inject = ['$scope','$modalInstance', 'Room'];

  function ScheduleModalCtrl($scope, $modalInstance, Room){
    $scope.loading = false;


    $scope.createInterview = function() {
      $scope.showLoadingCreateInterview = true;
      Room.createRoom($scope.newInterview).then(function(){
        $scope.showLoadingCreateInterview = false;
      });
      // Reset create interview object
      $scope.newInterview = {};
      //TODO: refresh page to display new interview once modal closes
    };

    $scope.showLoading = function(){
      $scope.loading = true;
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }
})();