(function(){

  angular
    .module('hackbox')
    .controller('scheduleCtrl', ScheduleCtrl);

  ScheduleCtrl.$inject = ['$scope', '$modal', '$log'];

  function ScheduleCtrl($scope, $modal, $log){
    
    $scope.openScheduleModal = function () {
      var modalInstance = $modal.open({
        templateUrl: '/app/schedule/scheduleModal.html',
        controller: 'scheduleModalCtrl',
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });
    };
  }
})();