

(function() {

  angular
    .module('hackbox')
    .controller('createInterviewCtrl', CreateInterviewCtrl);

    CreateInterviewCtrl.$inject = ['$scope', 'Room'];

    function CreateInterviewCtrl($scope, Room) {
      $scope.interview = {name: "John Doe", email: "john@email.com", time: ''};

      $scope.reset = function() {
        Room.getIncompleteInterviews().then(function(response){
          console.log(response);
        });
      };

      $scope.createInterview = function(a,b,c) {
        Room.createRoom($scope.interview);
      };

      $scope.reset();
    }

})();