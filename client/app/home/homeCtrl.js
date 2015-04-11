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

    $scope.incompleteInterviews = [{
            company: 'Hack Reactor',
            start_time: '10:00',
            created_by: 'HackBox Team',
            roomId: 'hackbox2'
          },
          {
            company: 'Hack Reactor2',
            start_time: '20:00',
            created_by: 'HackBox Team2',
            roomId: 'hackbox3'
          }];

    $scope.init = function(){
      Room.getUpcomingInterviews(function(response){
        
        // Populate incompleteInterviews with snapshot
        response.data.forEach(function(interview){
          var interview = {
            company: 'Hack Reactor',
            start_time: interview.start_time,
            created_by: 'HackBox Team',
            roomId: interview.roomId
          };

          $scope.incompleteInterviews.push(interview);
        });
      });
    };

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
