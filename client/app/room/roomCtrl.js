// roomCtrl.js
// This is the controller responsible for the room view. 
// Anything needing to change the room view should be placed here. 

(function(){

  angular
    .module('hackbox')
    .controller('roomCtrl', RoomCtrl);

  RoomCtrl.$inject = ['$scope', '$sce', 'Video', 'Drawing', 'TextEditor'];

  function RoomCtrl($scope, $sce, Video, Drawing, TextEditor){
    $scope.userVideoSource = null;
    $scope.peerVideoSource = null;
    $scope.drawingCanvas = null;
    $scope.showCanvas = false;
    $scope.editors = [];
    $scope.editorTabs = [];

    // The $destroy event is called when we leave this view
    $scope.$on('$destroy', function(){
      $scope.uninit();
    });

    // Function: RoomCtrl.init()
    // This function will initialize all entities upon switching the the room state.
    $scope.init = function(){
      $scope.initializeVideo('hackbox');
      $scope.initializeCanvas('canvas-container');
      $scope.addTextEditor();
    };

    $scope.uninit = function(){
      console.log('Leaving Room, shutting down video, canvas and removing listeners.');
      // Remove Video/Audio
      Video.getIcecommInstance().leave(true);

      // Remove Canvas
      Drawing.removeCanvas('canvas-container');

      // Remove all text editors
      $scope.editors.forEach(function(editor){
        editor.destroy();
      });
    };

    // Function: RoomCtrl.initializeVideo(roomName)
    // roomName: A string representing the roomname to join. 
    // This function will initialize the Video component of the room.
    $scope.initializeVideo = function(roomName){
      // Create the Icecomm object and get the instance of it.
      var comm = Video.getIcecommInstance();

      // Connect to the correct room.
      comm.connect(roomName, {limit: 2, audio: false});

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
      var canvas = Drawing.makeCanvas();
      $('.canvas-container').append(canvas);

      var canvasFabric = new fabric.Canvas('drawingCanvas', {
        isDrawingMode: true
      });

      canvasFabric.setHeight(400);
      canvasFabric.setWidth(650);

      //Give roomcontroller a reference to the canvas
      $scope.drawingCanvas = canvasFabric;
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
    
    $scope.addTextEditor = function(){
      if($scope.editors.length < 5){
        // Add new tab
        var tab = {};
        tab.id = $scope.editors.length;
        tab.name = 'New Tab';
        $scope.editorTabs.push(tab);  

        // Remove active property from all editors
        $('.editor').removeClass('active');

        // Add new editor
        var editor = {};
        editor.id = 'editor' + $scope.editors.length;
        $('#editors').append('<div class="editor active" id="'+ editor.id + '"></div>');
        TextEditor.createEditor(editor.id);
        $scope.editors.push(editor);
      }
      else{
        console.log('Cannot have more than 5 editors!');
      }
    };

    $scope.setActiveEditor = function(editorId){
      var id = '#editor' + editorId;

      // Remove active property from all editors
      $('.editor').removeClass('active');

      // Add active to the editor with the correct id. 
      $(id).addClass('active');
    };

    $scope.toggleCanvas = function(){
      $scope.showCanvas = !$scope.showCanvas;
    };

    // Call the initialize function
    $scope.init();
  }
})();
