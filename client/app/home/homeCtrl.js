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
    $scope.showLoadingCreateInterview = false;
    $scope.isLoggedIn = false;
    $scope.timeframe = 'Upcoming';
    $scope.interviewOrder = '+start_time';
    $scope.incompleteInterviews = [];
    $scope.newInterview = {};

    /**
     * Function: HomeCtrl.init()
     * This function will initialize the home page. If the user is logged in,
     * they will see a list of interviews coming up. Otherwise nothing. 
     */
    $scope.init = function(){
      // Check if the user is logged in
      Auth.isAuthenticated().then(function(response){
        if(response.data){
          console.log("User is logged in, getting all interviews.")
          $scope.showCreateInterview = true;
          $scope.isLoggedIn = true;

          // Refresh all interviews and display
          $scope.refreshInterviews();
        }
        else{
          console.log('User is not logged in');
        }
      });
    };

    /**
     * Function: HomeCtrl.logout()
     * This function will log the user out.
     */
    $scope.logout = function () {
      Auth.logout().then(function(){
        $scope.isLoggedIn = false;
      });
      console.log('Logging out!');
    };

    /**
     * Function: HomeCtrl.joinRoom()
     * This function will join a room with a particular roomId
     */
    $scope.joinRoom = function(interview){
      console.log('Joining: ' + interview.roomId);
      $state.go('room', {roomId: interview.roomId})
    } 

    /**
     * Function: HomeCtrl.remove()
     * This function will remove a room from the user's list and resync with database
     */
    $scope.remove = function(roomId){
      Room.deleteRoom(roomId, $scope.refreshInterviews);
    }

    /**
     * Function: HomeCtrl.quickRoom()
     * This function will create a random room for a user. 
     */
    $scope.quickRoom = function(){
      var room = {
        time: new Date(),
        user: 'Demo User',
        email: 'demoUser@email.com',
        name: 'Demo Room'
      };

      Room.createRoom(room,function(response){
        console.log(response);
        $state.go('demo', {roomId: response.data._id})
      });
    };

    /**
     * Function: refreshInterviews()
     * This function will refresh all interviews for a user and add them to 
     * a list. 
     */
     $scope.refreshInterviews = function(){
      $scope.incompleteInterviews = [];
      $scope.showLoadingCreateInterview = true;
      
      Room.getUpcomingInterviews(function(response){
        var allInterviews = response.data;

        // If there are interviews that came back, populate our list with them
        if(allInterviews.length > 0){
          // Populate incompleteInterviews with snapshot
          allInterviews.forEach(function(interview){
            console.log(interview);
            var emptyObj = (Object.keys(interview).length === 0);
            if(!emptyObj) {
              var interview = {
                displayedStart_time: new Date(interview.start_time).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', weekday: 'short', year: 'numeric', month: 'long', day: 'numeric', timeZoneName: 'long'}),
                start_time: interview.start_time,
                candidateName: interview.candidateName,
                candidateEmail: interview.candidateEmail,
                created_by: interview.created_by,
                roomId: interview.id
              };
              $scope.incompleteInterviews.push(interview);
              $scope.showLoadingCreateInterview = false;
            }
          });
        }
        // If there are no interviews that came back, then we display nothing
        else {
          $scope.showLoadingCreateInterview = false;
        }
      });
    }

    $scope.setInterviewFilter = function(timeframe){
      $scope.timeframe = timeframe;

      if(timeframe === 'Completed')
        $scope.interviewOrder = '-start_time';
      else if(timeframe === 'Upcoming')
        $scope.interviewOrder = '+start_time';
      else
        $scope.interviewOrder = '+start_time';
    };

    $scope.init();
  }
})();
