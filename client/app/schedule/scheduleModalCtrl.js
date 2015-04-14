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

    $scope.createInterview = function() {
      $scope.showLoadingCreateInterview = true;
      Room.createRoom($scope.newInterview).then(function(){
        $scope.showLoadingCreateInterview = false;
      });
      $modalInstance.dismiss('cancel');
    };

    $scope.showLoading = function(){
      $scope.loading = true;
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }
})();