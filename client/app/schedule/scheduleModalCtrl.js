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

  ScheduleModalCtrl.$inject = ['$state', '$scope','$modalInstance', 'Room'];

  function ScheduleModalCtrl($state, $scope, $modalInstance, Room){
    $scope.loading = false;
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();        // returns year
    var currentMonth = currentDate.getMonth();          // returns month with Jan = 0
    var currentDay = currentDate.getDate();             // returns day of month (getDay returns day of week)
    var currentHour = currentDate.getHours();           // returns hour
    var currentMinute = currentDate.getMinutes();       // returns minute 
    
    $scope.newInterview.time = new Date(currentYear,
                                        currentMonth, 
                                        currentDay, 
                                        currentHour, 
                                        currentMinute);

    /**
     * Function: HomeCtrl.createInterview()
     * This function will create a new interview. It calls refresh to update the DOM
     * with the list of all interviews for the user. 
     */
    $scope.createInterview = function() {
      $scope.loading = true;
      Room.createRoom($scope.newInterview, function(){
        $scope.newInterview.sendEmail = false;
        $scope.newInterview.name = null;
        $scope.newInterview.email = null;
        $scope.newInterview.time = null;
        $scope.exitModal();
      });
    };

    $scope.exitModal = function() {
      setTimeout(function() {
        $scope.loading = false;
        $modalInstance.dismiss('cancel');
        $scope.refreshInterviews();
      }, 2000);
    };
  }
})();