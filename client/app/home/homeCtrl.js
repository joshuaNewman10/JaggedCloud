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
    /////////// Scope Variables and Constants //////////
    $scope.showCreateInterview = false;          // Shows/Hides create interview button
    $scope.showLoadingInterviews = false;        // Shows/Hides loading interviews spinner
    $scope.isLoggedIn = false;                   // Boolean determining is the user is signed in
    $scope.timeframe = 'Upcoming';               // Timeframe used for filtering interviews
    $scope.interviewOrder = '+start_time';       // OrderBy string used for ordering interviews
    $scope.allInterviews = [];                   // Array of all interviews for user
    $scope.newInterview = {};                    // Used to save state upon closing schedule interview modal
    /////////// Scope Variables and Constants //////////

    ///////////////    Home Methods     ///////////////
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
        $state.go('demo', {roomId: response.data._id})
      });
    };

    /**
     * Function: refreshInterviews()
     * This function will refresh all interviews for a user and add them to 
     * a list. 
     */
     $scope.refreshInterviews = function(){
      $scope.showLoadingInterviews = true;
      
      Room.getUpcomingInterviews(function(response){
        var interviewsFromDb = response.data;
        var newInterviews = [];

        // If there are interviews that came back, populate our list with them
        if(interviewsFromDb.length > 0){
          // Populate allInterviews with snapshot
          interviewsFromDb.forEach(function(interview){
            if(!(Object.keys(interview).length === 0)) {
              var interview = {
                start_time: interview.start_time,
                end_time: interview.end_time,
                displayed_date: new Date(interview.start_time).toLocaleString('en-US', { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' }),
                displayed_time: new Date(interview.start_time).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', timeZoneName: 'short' }),
                candidateName: interview.candidateName,
                candidateEmail: interview.candidateEmail,
                created_by: interview.created_by,
                roomId: interview.id
              };
              newInterviews.push(interview);
            }
          });
        }
        // Copy the list of interviews into the old array so angular maintains binding
        angular.copy(newInterviews, $scope.allInterviews);
        $scope.showLoadingInterviews = false;
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
    ///////////////    Home Methods     ///////////////

    $scope.init();
  }
})();
