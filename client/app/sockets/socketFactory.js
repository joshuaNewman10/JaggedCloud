/**socketFactory.js
 *
 * This is a service designed to sync the canvas and text editor for both 
 * members of a room. 
 * It works using sockets.io where this factory wraps the socket Object
 */
(function() {
  angular
  .module('hackbox')
  .factory('Sockets', Sockets);

  Sockets.$inject = [];

  function Sockets() {
    var _socket;

    var instance = {
      init: init,
      on: on,
      emit: emit,
      disconnect: disconnect
    };
    return instance;

  //// IMPLEMENTATION ////

    function init(){
      _socket = io.connect({'forceNew': true});
    }

    /**Function: Sockets.on()
     *
     * This Function listens for generic socket events from the server
     */
    function on(eventName, callback) {
      _socket.on(eventName, function() {
        var args = Array.prototype.slice.call(arguments);
        if( callback ) {
          callback.apply(_socket, args);
        }
      });
    }
    
    /**Function: Sockets.emit()
     *
     * This Function emits generic socket events, sends the data to the server
     * and then also will execute a callback if specified
     */
    function emit(eventName, data, callback) {
      _socket.emit(eventName, data, function() {
        var args = Array.prototype.slice.call(arguments);
        if( callback ) {
          callback.apply(_socket, args);  
        }     
      });
    }

    function disconnect() {
      console.log('disconnecting socket');
      _socket.io.close();
      _socket.disconnect()
    }
  }
})();