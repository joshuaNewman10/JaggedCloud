

(function() {

  angular
    .module('hackbox')
    .controller('createInterviewCtrl', CreateInterviewCtrl);

    CreateInterviewCtrl.$inject = ['$scope', 'Room'];

    function CreateInterviewCtrl($scope, Room) {
      $scope.interview = {};

      $scope.reset = function() {
        console.log('reset');
      };

      $scope.reset();
    }

})();