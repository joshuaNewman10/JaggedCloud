/**
 * homeCtrl.js
 *
 * This is the controller responsible for the main landing page. 
 */ 

(function(){

  angular
    .module('hackbox')
    .controller('homeCtrl', HomeCtrl);

  HomeCtrl.$inject = ['$scope' ,'$modal', '$log', 'Auth'];

  function HomeCtrl($scope, $modal, $log, Auth){

    $scope.upcomingInterviews = [];

    /**
     * Function: HomeCtrl.logout()
     * This function will log the user out.
     */
    $scope.logout = function () {
      Auth.logout();
      console.log('Logging out!');
    };

    $scope.joinRoom = function(interview){
      console.log('Joining: ' + interview.roomId)
    } 

    $scope.testingInit = function(){
      var room1 = {
        company: 'Intel',
        start_time: '10:30',
        created_by: 'Kwong Chan',
        roomId: "JA234N2Kr2r2f2J6NK34HAasdfasdfJ3L41K4"
      };
      $scope.upcomingInterviews.push(room1);

      var room2 = {
        company: 'Google',
        start_time: '12:30',
        created_by: 'Michael Chen',
        roomId: "JFLAK20f93rnfasd-11ajksdfj"

      };
      $scope.upcomingInterviews.push(room2);

      var room3 = {
        company: 'AirBnB',
        start_time: '2:14',
        created_by: 'Richard Kho',
        roomId: "37SPFj320v20fgn0=f2-0fj"

      };
      $scope.upcomingInterviews.push(room3);

      var room4 = {
        company: 'Hack Reactor',
        start_time: '9:25',
        created_by: 'Marcus Phillips',
        roomId: "kjalhsdf9920ndASDLKJA(@2od0f2"

      };
      $scope.upcomingInterviews.push(room4);
    };

    $scope.testingInit();
    // Upon loading home, if the user is authenticated
    // Get his list of interviews upcoming. 
    // Populate the list using an ng-repeat and make each div clickable
    // On click, send him to the room/roomId which will make a get request
    // to the server. 
  }
})();
