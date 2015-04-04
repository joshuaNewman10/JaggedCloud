// roomCtrl.js
// This is the controller responsible for the room view. 
// Anything needing to change the room view should be placed here. 

(function(){

  angular
    .module('hackbox')
    .controller('roomCtrl', RoomCtrl);

  RoomCtrl.$inject = ['$scope', '$sce', 'Video'];

  function RoomCtrl($scope, $sce, Video){
    $scope.userVideoSource = null;
    $scope.peerVideoSource = null;

    // Function: RoomCtrl.init()
    // This function will initialize all entities upon switching the the room state.
    $scope.init = function(){
      $scope.initializeVideo('hackbox');
    };

    // Function: RoomCtrl.initializeVideo(roomName)
    // roomName: A string representing the roomname to join. 
    // This function will initialize the Video component of the room.
    $scope.initializeVideo = function(roomName){
      // Create the Icecomm object and get the instance of it.
      var comm = Video.getIcecommInstance();

      // Connect to the correct room.
      comm.connect(roomName, {audio: false});

      // Register user video connected event
      comm.on('local', function(peer) {
        $scope.userVideoSource = $sce.trustAsResourceUrl(peer.stream);
        $scope.$digest();
      });

      // Register peer connect/disconnect event
      comm.on('connected', function(peer) {
          $scope.peerVideoSource = $sce.trustAsResourceUrl(peer.stream);
          $scope.$digest();
      });

      comm.on('disconnect', function(peer) {
          $scope.peerVideoSource = '';
          $scope.$digest();
      });
    };

    // Call the initialize function
    $scope.init();
  }
})();
