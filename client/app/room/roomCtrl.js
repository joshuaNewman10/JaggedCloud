// roomCtrl.js
// This is the controller responsible for the room view. 
// Anything needing to change the room view should be placed here. 

(function(){

  angular
    .module('hackbox')
    .controller('roomCtrl', RoomCtrl);


  RoomCtrl.$inject = ['$scope', '$sce', 'Video', 'Drawing', '$http'];

  function RoomCtrl($scope, $sce, Video, Drawing, $http){
    $scope.userVideoSource = null;
    $scope.peerVideoSource = null;
    $scope.drawingCanvas = null;
    $scope.ioStuff = null;
    $scope.socket = null;
    $scope.x = null;
    $scope.y = null;

    $scope.$on('$destroy', function(){
      $scope.uninit();
    });

    // Function: RoomCtrl.init()
    // This function will initialize all entities upon switching the the room state.
    $scope.init = function(){
      $scope.initializeVideo('hackbox');
      $scope.initializeCanvas('canvas-container');
      $scope.initializeIO();
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

    //Function: RoomCtrl.initializeCanvas() 
    //This function gets a new canvas from the Drawing Factory
    //it then appends the canvas to the DOM and wraps
    //the canvas element inside Fabric
    //lastly it gives a reference of the fabric object to the room controller's scope
    $scope.initializeCanvas = function(containerClassName) {
      //create a new canvas object and get its reference
      var canvas = Drawing.makeCanvas();
      $('.canvas-container').append(canvas);

      var canvasFabric = new fabric.Canvas('drawingCanvas', {
        isDrawingMode: true
      });

      canvasFabric.setHeight(300);
      canvasFabric.setWidth(300);

      //Give roomcontroller a reference to the canvas
      $scope.drawingCanvas = canvasFabric;

      canvasFabric.on('mouse:move', function(e) {
        var activeObject = e.target;
        var xCoord = e.e.clientX;
        var yCoord = e.e.clientY;
        $scope.socket.emit('coords', {x: xCoord, y:yCoord});
  
      });
    };

    //Function: RoomCtrl.saveCanvas()
    //This function is called when the user clicks the saveCanvas button
    //It converts the canvas data into a png image string and then
    //makes a request to our server to store the image in the database
    $scope.saveData = function() {
      var drawingData = {
        username: 'testname123',
        data: $scope.drawingCanvas.toDataURL()
      };

      var request = {
        method: 'POST',
        url: '/room/save',
        headers: {
         'Content-Type': 'json'
        },
        data: { 
          roomId: '1',
          canvas: JSON.stringify(drawingData)
        }
      };

      $http(request)
      .success(function(response){
        console.log('http response', response);
      })
      .error(function(error){
        console.log('error', error);
      });
    };

    $scope.initializeIO = function() {
      var socket = io();
      console.log(socket);
      socket.on('greeting', function(data){
          console.log('canvas data: ' + data);
          $scope.ioStuff = data;
          console.log('weee', $scope.ioStuff);
          $scope.$digest();
      });
    $scope.socket = socket;
    socket.on('coordinates', function(data) {
      console.log(data);
      $scope.x = data.data.x;
      $scope.y = data.data.y;
      $scope.$digest();
      console.log(data.data.x, data.data.y, $scope.x, $scope.y);
    });
    };


    // Call the initialize function
    $scope.init();
  }
})();
