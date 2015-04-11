/** 
 * drawingCtrl.js
 * 
 * This is the controller responsible for the drawing canvas in a room.
 */

(function() {
  angular
    .module('hackbox')
    .controller('drawingCtrl', DrawingCtrl);

  DrawingCtrl.$inject = ['$scope', 'Drawing', 'Sockets'];

  function DrawingCtrl($scope, Drawing, Sockets) {
    $scope.drawingCanvas = null;
    $scope.socket = null;
    $scope.intervalID = null;
    
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
        var obj = JSON.parse(data);
        console.log(obj);
        $scope.drawingCanvas.loadFromJSON(obj, $scope.drawingCanvas.renderAll.bind($scope.drawingCanvas));
      });
    };

    /**
     * Function: DrawingCtrl.addCanvas()
     * This function adds a new Fabric Canvas to the DOM
    */
    $scope.addCanvas = function() {
      var canvas = Drawing.makeCanvas();
      $('.drawing-container').append(canvas);

      $scope.drawingCanvas = new fabric.Canvas('drawingCanvas', {
        isDrawingMode: true
      });

      $scope.drawingCanvas.freeDrawingBrush = new fabric['Circle'+ 'Brush']($scope.drawingCanvas);
      $scope.drawingCanvas.setHeight(400);
      $scope.drawingCanvas.setWidth(650);

      // $scope.drawingCanvas.on('mouse:down', function(e) {
        $scope.drawingCanvas.on('mouse:down', function(options) {
          $scope.intervalID = setInterval(function() {
            var json = JSON.stringify( $scope.drawingCanvas.toJSON() );
            Sockets.emit('coords', json);
            console.log('emit!');
          }, 50);
        });
        $scope.drawingCanvas.on('mouse:up', function() {
          console.log('interval cleared');
          clearInterval($scope.intervalID);
          var json = JSON.stringify( $scope.drawingCanvas.toJSON() );
          Sockets.emit('coords', json);
        });
    };

    $scope.toggleDrawingMode = function() {
      $scope.drawingCanvas.isDrawingMode = !$scope.drawingCanvas.isDrawingMode;
     
    };
    $scope.init();
  }
})();