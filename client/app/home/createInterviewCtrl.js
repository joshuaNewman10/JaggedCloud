

(function() {

  angular
    .module('hackbox')
    .controller('createInterviewCtrl', CreateInterviewCtrl);

    CreateInterviewCtrl.$inject = ['$scope', 'Room'];

    function CreateInterviewCtrl($scope, Room) {
      $scope.interview = {name: "John Doe", email: "john@email.com", time: ''};

      $scope.reset = function() {
        console.log('reset');
      };

      $scope.createInterview = function(a,b,c) {
        console.log('what the hell', arguments);
        Room.createRoom($scope.interview);
      };

      $scope.reset();
    }

})();