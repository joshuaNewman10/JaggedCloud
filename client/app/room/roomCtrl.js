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

  RoomCtrl.$inject = ['$rootScope', '$timeout', '$scope', '$stateParams', 'TextEditor', 'Room', 'Drawing', '$state'];

  function RoomCtrl($rootScope, $timeout, $scope, $stateParams, TextEditor, Room, Drawing, $state){
    /////////// Scope Variables and Constants //////////
    $scope.showCanvas = false;            // Shows/hides canvas
    $scope.saving = false;                // Shows/hides saving spinner
    $scope.roomId = $stateParams.roomId;  // Current RoomId
    $scope.isPeerTyping = false;          // Shows/hides typing message when receiving text
    $scope.videoToggle = false;           // Flips webcam
    $scope.displayOpen = false;           // Shows/hides Open Button to open a room
    $scope.displayClose = false;          // Shows/hides Close Button to close a room
    $scope.isCreator = false;             // Determines if a user was the creator of a room
    $scope.startTime;                     // Tracks start time of room as given by server
    $scope.endTime;                       // Tracks end time of room as given by server

    var isTypingPromise = null;           // Helps act as a timer reset
    var AUTOSAVE_FREQUENCY_MS = 60000;    // Frequency of auto-save feature in ms
    var saveInterval = null;              // Interval that will run the auto-save feature
    ///////// End Scope Variables and Constants /////////

    ////////////////// Event Listeners //////////////////
    /**
     * The $destroy event is called when we leave this view
     */
    $scope.$on('$destroy', function(){
      $scope.uninit();
      clearInterval(saveInterval);
    });

    /**
     * This event is heard when Icecomm is receiving data. 
     * It starts a 1 second timer to display a message which will reset if
     * data is continued to be heard before the timer expires. 
     * When the timer expires, the message is removed. 
     */
    $rootScope.$on('receivingData', function(){
      $scope.$apply(function(){
        $scope.isPeerTyping = true;

        if(isTypingPromise !== null )
          $timeout.cancel(isTypingPromise);

        isTypingPromise = $timeout(function () { $scope.isPeerTyping = false; }, 1000);
      });
    });
    ////////////////// End Event Listeners //////////////////

    //////////////////    Room Methods     //////////////////
    /**  
     * Function: RoomCtrl.init()
     * This function will initialize all entities upon switching the the room state.
     */
    $scope.init = function(){
      console.log('Initializing room controller');

      // Fetch the room from the database
      Room.getRoom($scope.roomId, function(response){

        // Initialize text editors and notes if needed
        // Assign the save keyboard shortcut to each editor
        if(response.data.creator){
          TextEditor.initNotes(response.data.notes, $scope.saveNoteData);
        }
        
        TextEditor.init(response.data.text);
        TextEditor.assignKBShortcuts($scope.saveTextAndCanvasData);

        // Update the canvas with the saved data
        if(response.data.canvas){
          Drawing.updateCanvas(response.data.canvas);
        }

        $scope.isCreator = response.data.creator;
        $scope.displayOpen = response.data.displayOpen;
        $scope.displayClose = response.data.displayClose;
        $scope.startTime = new Date(response.data.start_time).toLocaleString();
        $scope.endTime = new Date(response.data.end_time).toLocaleString();

        // Start interval for saving
        saveInterval = setInterval(function(){
          $scope.saveTextAndCanvasData();
          if(response.data.creator){
            $scope.saveNoteData();
          }
        }, AUTOSAVE_FREQUENCY_MS);
      });
    };

    /**
     * Function: RoomCtrl.uninit()
     * This function will be called when we leave a room.
     * It will cleanup all entities within a given room such as video and text editors. 
     */
    $scope.uninit = function(){
      console.log('Leaving Room!');
    };

    /**
     * Function: RoomCtrl.saveData(dataObj)
     * This function is the core save function. Any saving function should pass the object
     * to save to this function. 
     *
     * @param dataObj: The object to send to the server to save. This needs a roomId
     * and some data to save. The server will update all fields that match in the model.
     */
    $scope.saveData = function(dataObj) {
      Room.saveRoom(dataObj, function(){
        $scope.saving = false;
      });
    };

    /**
     * Function: RoomCtrl.saveTextAndCanvasData()
     * This function will save the Text and Canvas to the database.
     */
    $scope.saveTextAndCanvasData = function() {
      $scope.saving = true;

      // Get canvas data and text editor data
      var canvas = JSON.stringify(Drawing.getCanvas().toJSON());
      var text = [];
      TextEditor.getEditors().forEach(function(editor){
        var editorObj = {editorId: editor.id, data: editor.editor.getSession().getValue()}
        text.push(editorObj);
      });

      var roomData = {
        roomId: $scope.roomId,
        canvas: canvas,
        text: text
      };
      
      $scope.saveData(roomData);
    };

    /**
     * Function: RoomCtrl.saveTimeData(startTime, endTime)
     * This function will save the start and end time to the database
     */
    $scope.saveTimeData = function(startTime, endTime) {
      $scope.saving = true;

      var timeData = {
        roomId: $scope.roomId,
        start_time: Date.parse(startTime),
        end_time: Date.parse(endTime)
      };

      $scope.saveData(timeData);
    }

    /**
     * Function: RoomCtrl.saveNoteData()
     * This function will save the notes to the database. 
     */
    $scope.saveNoteData = function() {
      $scope.saving = true;

      var noteData = {
        roomId: $scope.roomId,
        notes: TextEditor.getNotes().editor.getSession().getValue()
      };

      $scope.saveData(noteData);
    }

    /**
     * Function: RoomCtrl.toggleCanvas(forceCanvasOff)
     * This function will toggle the canvas on/off.
     *
     * @param forceCanvasOff: True will force the canvas off.
     */
    $scope.toggleCanvas = function(forceCanvasOff){
      if(forceCanvasOff !== undefined && forceCanvasOff)
        $scope.showCanvas = false;
      else if(forceCanvasOff !== undefined && !forceCanvasOff)
        $scope.showCanvas = true;
      else
        $scope.showCanvas = !$scope.showCanvas;

      if(!$scope.showCanvas){
        TextEditor.resizeAllEditors();
      }
    };
    
    /**
     * Function: RoomCtrl.clearCanvas()
     * This function will clear the canvas
     */
    $scope.clearCanvas = function() {
      Drawing.clearCanvas();
    };

    /**
     * Function: RoomCtrl.toggleEraser()
     * This function will turn on/off the eraser
     */
    $scope.toggleEraser = function() {
      Drawing.toggleEraser();
    };

    /**
     * Function: RoomCtrl.toggleVideo()
     * This function will toggle the video between the user and peer.
     */
    $scope.toggleVideo = function(){
      $scope.videoToggle = !$scope.videoToggle;
    };

    /**
     * Function: RoomCtrl.openRoom()
     * This function will change the start time of a room, opening it up.
     */
    $scope.openRoom = function(){
      $scope.startTime = new Date().toLocaleString();
      $scope.saveTimeData($scope.startTime, $scope.endTime);
      $scope.displayOpen = false;
      $scope.displayClose = true;
    };

    /**
     * Function: RoomCtrl.closeRoom()
     * This function will change the end time of a room to the current time + 1 minute
     */
    $scope.closeRoom= function(){
      $scope.endTime = (new Date() + 60000).toLocaleString();
      $scope.saveTimeData($scope.startTime, $scope.endTime);
      $scope.displayClose = false;
    };
    //////////////////   End Room Methods   //////////////////

    // Call the initialize function
    console.log('Joining Interview with ID: ' + $stateParams.roomId);
    $scope.init();
  }
})();
