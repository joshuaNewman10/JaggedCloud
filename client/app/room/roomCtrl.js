/** 
 * roomCtrl.js
 * 
 * This is the controller responsible for the room view. 
 * Anything needing to change the room view should be placed here. 
 */

(function(){

  angular
    .module('hackbox')
    .controller('roomCtrl', RoomCtrl);

  RoomCtrl.$inject = ['$scope', '$sce', '$http', 'Video', 'Drawing', 'Sockets', 'TextEditor'];

  function RoomCtrl($scope, $sce, $http, Video, Drawing, Sockets, TextEditor){
    $scope.userVideoSource = null;
    $scope.peerVideoSource = null;
    $scope.drawingCanvas = null;
    $scope.showCanvas = false;
    $scope.editors = [];
    $scope.socket = null;
    $scope.x = null;
    $scope.y = null;
    var MAX_EDITORS = 5;

  RoomCtrl.$inject = ['$scope', '$sce', 'Video', 'Drawing','Sockets', '$http'];

    // The $destroy event is called when we leave this view
    $scope.$on('$destroy', function(){
      $scope.uninit();
    });

    /**  
     * Function: RoomCtrl.init()
     * This function will initialize all entities upon switching the the room state.
     */
    $scope.init = function(){
      $scope.initializeVideo('hackbox');
      $scope.initializeCanvas('canvas-container');
      $scope.addTextEditor();
      $scope.initializeIO();
    };

    /**
     * Function: RoomCtrl.uninit()
     * This function will be called when we leave a room.
     * It will cleanup all entities within a given room such as video and text editors. 
     */
    $scope.uninit = function(){
      console.log('Leaving Room, shutting down video, canvas and removing listeners.');
      // Remove Video/Audio
      Video.getIcecommInstance().leave(true);

      // Remove Canvas
      Drawing.removeCanvas('canvas-container');

      // Remove all text editors
      $scope.editors.forEach(function(editor){
        editor.editor.destroy();
      });
    };

    /**
     * Function: RoomCtrl.initializeVideo(roomName)
     * This function will initialize the Video component of the room.
     *
     * @param roomName: A string representing the roomname to join. 
     */
    $scope.initializeVideo = function(roomName){
      // Create the Icecomm object and get the instance of it.
      var comm = Video.getIcecommInstance();

      // Connect to the correct room. Room supports a maximum of 2 people. 
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

    /**
     * Function: RoomCtrl.initializeCanvas(containerClassName)
     * This function will append a canvas element to the room. 
     *
     * @param containerClassName: NOT_USED_CURRENTLY
     */
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

      $scope.drawingCanvas.on('mouse:move', function(e) {
        var activeObject = e.target;
        var xCoord = e.e.clientX;
        var yCoord = e.e.clientY;
        var data = $scope.drawingCanvas.toDataURL();
        Sockets.emit('coords', {x: xCoord, y:yCoord, canvasData: data});  
      });
    };

    /**
     * Function: RoomCtrl.saveData()
     * This function is called when the user clicks the saveCanvas button
     * It converts the canvas data into a png image string and then
     * makes a request to our server to store the image in the database
     */
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
    
    /**
     * Function: RoomCtrl.addTextEditor()
     * This function will add a new text editor to the DOM. 
     */
    $scope.addTextEditor = function(){
      if($scope.editors.length < MAX_EDITORS){
        // Get the id to assign
        var editorId = nextSmallestId($scope.editors, MAX_EDITORS);

        // Hide all editors and tabs
        deactivateTabsAndEditors();

        // Add new editor, starts as active.
        var tab = {name: 'New Tab', active: true}; 
        var editor = {id: editorId, tab: tab, editor: TextEditor.createEditor('#editors',editorId)};
        $scope.editors.push(editor);
      }
      else{
        console.log('Cannot have more than 5 editors!');
      }
    };

    /**
     * Function: RoomCtrl.removeTextEditor(editorId)
     * This function will remove a text editor from the DOM.
     *
     * @param editorId: An integer representing the ID of an editor object. Range(0 - MAX_EDITORS)
     */
    $scope.removeTextEditor = function(editorId){
      var switchEditorFocus = false;

      if($scope.editors.length > 1){
        // Determine if the currently activeEditor is the one being removed
        if( $('.activeEditor').attr('id') === 'editor' + editorId )
          switchEditorFocus = true;

        // Remove the element from the DOM by element Id
        var id = '#editor' + editorId;
        $(id).remove();

        // Destroy the editor and splice the element with the matching id out of editors
        var idxToRemove = indexOfEditorWithId(editorId);
        $scope.editors[idxToRemove].editor.destroy();
        $scope.editors.splice(idxToRemove,1);

        // Set active editor if needed
        if(switchEditorFocus){
          if(idxToRemove < $scope.editors.length)
            $scope.setActiveEditor($scope.editors[idxToRemove].id);
          else
            $scope.setActiveEditor($scope.editors[idxToRemove-1].id);
        }
      }
    };

    /**
     * Function: RoomCtrl.removeTextEditor(editorId)
     * This function will set the editor in the collection with the matching Id as the active editor 
     *
     * @param editorId: An integer representing the ID of an editor object. Range(0 - MAX_EDITORS)
     */
    $scope.setActiveEditor = function(editorId){
      var editorToFocusOn = indexOfEditorWithId(editorId);
      // Hide all tabs and editors.
      deactivateTabsAndEditors();

      // Add 'activeEditor' class to the editor with the correct id. Also set the tab as active.
      TextEditor.setEditorActive(editorId);
      $scope.editors[editorToFocusOn].tab.active = true;

      // Focus on the editor and set cursor to end.
      $scope.editors[editorToFocusOn].editor.focus();
      $scope.editors[editorToFocusOn].editor.navigateLineEnd();
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
      Sockets.on('init', function (data) {
        console.log('initialized!!!', data);
      });

      Sockets.on('greeting', function(data) {
        console.log('got socket greeting data', data);
        $scope.$digest();
      });
    };

      // Sockets.on('coordinates', function(data) {
        // Drawing.updateCanvas('canvas-container', data.canvasData);
      // });
   

    /**
     * Function: RoomCtrl.toggleCanvas()
     * This function will toggle the canvas on/off.
     */
    $scope.toggleCanvas = function(){
      $scope.showCanvas = !$scope.showCanvas;
    };
    $scope.init();
  }
  
    /**
     * Function: deactivateTabsAndEditors()
     * A helper function to set all editors and tabs as inactive. 
     */
    function deactivateTabsAndEditors(){
      // Remove active class from all editors
      TextEditor.deactivateAllEditors();

      // Remove activeTab class from all tabs
      $scope.editors.forEach(function(editor){
        editor.tab.active = false;
      });
    }

    /**
     * Function: nextSmallestId(arr, limit)
     * A helper function to find the smallest editor.id # from 0 - limit
     * that does not exist currently in the editors collection.
     *
     * @param arr: A collection to iterate over. 
     * @param limit: The maximum value of an ID #
     * @return: The minimum ID # that does not currently exist within the collection. 
     */
    function nextSmallestId(arr, limit){
      var ids = {};
      for(var i = 0; i < arr.length; i++){
        var editor = arr[i];
        ids[editor.id] = true;
      }
      for(var i = 0; i < limit; i++){
        if(ids[i] !== true)
          return i;
      }
      return 0;
    }

    /**
     * Function: indexOfEditorWithId(editorId)
     * A helper function to find the smallest editor.id # from 0 - limit
     * that does not exist currently in the editors collection.
     *
     * @param editorId: An integer representing the ID of the editor to find. Range(0 - MAX_EDITORS)
     * @return: The index in the editors collection which corresponds to the editor with the 
     * matching Id. 
     */
    function indexOfEditorWithId(editorId){
      var idx = $scope.editors.map(function(editor) {
        return editor.id;
      }).indexOf(editorId);
      return idx;
    }

})();
