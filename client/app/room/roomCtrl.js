// roomCtrl.js
// This is the controller responsible for the room view. 
// Anything needing to change the room view should be placed here. 

(function(){

  angular
    .module('hackbox')
    .controller('roomCtrl', RoomCtrl);

  RoomCtrl.$inject = ['$scope', '$sce', 'Video', 'Drawing'];

  function RoomCtrl($scope, $sce, Video, Drawing){
    $scope.userVideoSource = null;
    $scope.peerVideoSource = null;
    $scope.canvas = null;

    $scope.$on('$destroy', function(){
      $scope.uninit();
    });

    // Function: RoomCtrl.init()
    // This function will initialize all entities upon switching the the room state.
    $scope.init = function(){
      $scope.initializeVideo('hackbox');
      $scope.initializeCanvas('canvas-container');
    };

    $scope.uninit = function(){
      console.log('Leaving Room, shutting down video, canvas and removing listeners.');
      var comm = Video.getIcecommInstance();
      comm.leave(true);
      Drawing.removeCanvas('canvas-container');
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
      });
    };

    $scope.initializeCanvas = function(containerClassName) {
      //create a new canvas object and get its reference
      var canvas = Drawing.makeCanvas(containerClassName);
      $('.' + containerClassName).append(canvas);

      //Give roomcontroller a reference to the canvas
      $scope.canvas = canvas;
    };

    // Call the initialize function
    $scope.init();
  }
})();
