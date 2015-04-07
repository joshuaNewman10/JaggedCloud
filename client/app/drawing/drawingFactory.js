/**
 * canvasFactory.js
 * This is a service designed to handle the drawing on canvas functionality within a given room.
 * It uses fabric.js, a library on top of HTML5 canvas
 * The data will be continually synced via WebSockets and saved at the end
 */

(function() {
  angular
    .module('hackbox')
    .factory('Drawing', Drawing);

  Drawing.$inject = [];

  function Drawing() {
    var instance = {
      makeCanvas: makeCanvas,
      removeCanvas: removeCanvas
    };

    return instance;

    //// IMPLEMENTATION /////

    /**
     * Function: Drawing.makeCanvas()
     * This Function will create and return a new HTML% canvas element
     * set its initial position, id and size it can then be appended to the DOM where/when desired
     * 
     * @return: Canvas element to append to DOM. 
     */
    function makeCanvas() {
      var newCanvas = $('<canvas></canvas>')
          .css({position: 'absolute', top: 250, left: 250})
          .attr('width', 300)
          .attr('height', 300)
          .attr('id', 'drawingCanvas');

      return newCanvas;
    }

    /**
     * Function: Drawing.removeCanvas(containerClassName)
     * This Function finds a canvas on screen with the specified id
     * and then removes the canvas
     *
     * @param containerClassName: The class to find elements by in the DOM. 
     * @return: True if canvas was removed, false if no action was taken. 
     */
    function removeCanvas(containerClassName) {
      var canvas = $('.' + containerClassName);
      if( canvas ) {
        canvas.remove();
        return true;
      }
      return false;
    }
  }
})();