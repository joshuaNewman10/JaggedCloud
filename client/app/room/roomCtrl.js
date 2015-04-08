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

  RoomCtrl.$inject = ['$scope', '$sce', '$http', 'Drawing', 'Sockets'];

  function RoomCtrl($scope, $sce, $http, Drawing, Sockets){
    $scope.drawingCanvas = null;
    $scope.showCanvas = false;
    $scope.socket = null;
    $scope.x = null;
    $scope.y = null;

    // The $destroy event is called when we leave this view
    $scope.$on('$destroy', function(){
      $scope.uninit();
    });

    /**  
     * Function: RoomCtrl.init()
     * This function will initialize all entities upon switching the the room state.
     */
    $scope.init = function(){
      $scope.initializeCanvas();
      $scope.initializeIO();
    };

    /**
     * Function: RoomCtrl.uninit()
     * This function will be called when we leave a room.
     * It will cleanup all entities within a given room such as video and text editors. 
     */
    $scope.uninit = function(){
      console.log('Leaving Room!');

      // Remove Canvas
      Drawing.removeCanvas('canvas-container');
    };


    /**
     * Function: RoomCtrl.initializeCanvas(containerClassName)
     * This function will append a canvas element to the room. 
     */
    $scope.initializeCanvas = function() {
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

      canvasFabric.on('mouse:move', function(e) {
        var activeObject = e.target;
        var xCoord = e.e.clientX;
        var yCoord = e.e.clientY;
        var data = $scope.drawingCanvas.toDataURL();
        Sockets.emit('coords', {x: xCoord, y: yCoord, canvasData: data});
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

    $scope.initializeIO = function() {
      var socket = io();
      $scope.socket = socket;

      Sockets.on('init', function (data) {
        console.log('initialized!!!', data);
      });

      Sockets.on('coordinates', function(data) {
        Drawing.updateCanvas(data.canvasData);
      });
    };
    
    /**
     * Function: RoomCtrl.toggleCanvas()
     * This function will toggle the canvas on/off.
     */
    $scope.toggleCanvas = function(){
      $scope.showCanvas = !$scope.showCanvas;
    };

    // Call the initialize function
    $scope.init();
  }
})();
