/**
 * homeCtrl.js
 *
 * This is the controller responsible for the main landing page. 
 */ 

(function(){

  angular
    .module('hackbox')
    .controller('homeCtrl', HomeCtrl);

  HomeCtrl.$inject = ['$scope' ,'$modal', '$state','$log', 'Auth', 'Room'];

  function HomeCtrl($scope, $modal, $state, $log, Auth, Room){
    $scope.showCreateInterview = false;
    $scope.incompleteInterviews = [];
    $scope.showLoadingCreateInterview = false;
    $scope.newInterview = {};

    $scope.init = function(){
      Auth.isAuthenticated().then(function(response){
        if(response.data){
          console.log("User is logged in, getting all interviews.")
          $scope.showCreateInterview = true;
          Room.getUpcomingInterviews(function(response){
            
            // Populate incompleteInterviews with snapshot
            response.data.forEach(function(interview){
              var interview = {
                company: 'Hack Reactor',
                start_time: interview.start_time,
                created_by: interview.created_by,
                roomId: interview.id
              };
              $scope.incompleteInterviews.push(interview);
            });
          });
        }
        else{
          console.log('User is not logged in');
        }
      });
    };

    $scope.createInterview = function() {
      $scope.showLoadingCreateInterview = true;
      Room.createRoom($scope.newInterview).then(function(){
        Room.getUpcomingInterviews(function(response){
          $scope.incompleteInterviews = [];
          // Populate incompleteInterviews with snapshot
          response.data.forEach(function(interview){
            var interview = {
              company: 'Hack Reactor',
              start_time: interview.start_time,
              created_by: interview.created_by,
              roomId: interview.id
            };
            $scope.incompleteInterviews.push(interview);
            $scope.showLoadingCreateInterview = false;
          });
        });
        // Reset create interview object
        $scope.newInterview = {};
        });
      });
    }

    /**
     * Function: HomeCtrl.logout()
     * This function will log the user out.
     */
    $scope.logout = function () {
      Auth.logout();
      console.log('Logging out!');
    };

    $scope.joinRoom = function(interview){
      console.log('Joining: ' + interview.roomId);
      $state.go('room', {roomId: interview.roomId})
    } 

    $scope.init();

    // Upon loading home, if the user is authenticated
    // Get his list of interviews upcoming. 
    // Populate the list using an ng-repeat and make each div clickable
    // On click, send him to the room/roomId which will make a get request
    // to the server. 
  }
})();
