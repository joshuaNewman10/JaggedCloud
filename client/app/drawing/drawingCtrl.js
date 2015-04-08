/** 
 * drawingCtrl.js
 * 
 * This is the controller responsible for the drawing canvas in a room.
 */

(function() {
  angular
    .module('hackbox')
    .controller('drawingCtrl', drawingCtrl);

  DrawingCtrl.$inject = ['$scope', 'Drawing', 'Sockets'];

  function DrawingCtrl($scope, Drawing, Sockets) {
    $scope.drawingCanvas = null;
    $scope.showCanvas = false;
    $scope.socket = null;
    $scope.x = null;
    $scope.y = null;
    
    //The $destroy event is called when we leave this view
    $scope.$on('destroy', function() {
      $scope.uninit();
    });

    /**
     * 
     * Function: DrawingCtrl.init()
     * This function initializes all entities upon switching room state
    */
    $scope.init = function() {
      $scope.addCanvas();
      $scope.initializeIO();
    };

    /**
     * Function: DrawingCtrl.uninit()
     * This function will be called when we leave a room
     * It will destroy all editors currently in use
    */
    $scope.uninit = function() {
      console.log('Destroying Canvas');
      Drawing.removeCanvas();
    };

    $scope.initializeIO = function() {
      console.log('Initializing Sockets IO');
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
     * Function: DrawingCtrl.addCanvas()
     * This function adds a new Fabric Canvas to the DOM
    */
    $scope.addCanvas = function() {
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



  }
})();