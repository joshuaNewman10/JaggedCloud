/**
 * icecommFactory.js
 *
 * This is a wrapper for icecomm.js and a service designed to handle
 * the video and audio transmission within a given room.
 * It also is capable of data transfer to entities within a specific room.
 * It uses Icecomm.js and maintains the instance to Icecomm.
 */

(function(){

  angular
    .module('hackbox')
    .factory('IcecommWrapper', IcecommWrapper);

  IcecommWrapper.$inject = [];

  function IcecommWrapper(){
    var comm = null;
    
    var instance = {
      getIcecommInstance: getIcecommInstance,
      setDataListener: setDataListener,
      uninitialize: uninitialize
    };

    return instance;

    ///// IMPLEMENTATION /////

    /**
     * Function: Icecomm.getIcecommInstance()
     * This function returns an Icecomm object. If it does not exist, it creates one. 
     *
     * @return: The Icecomm instance if possible, or else null. 
     */
    function getIcecommInstance(){
      if(!comm){
        comm = new Icecomm('RyGfR1DIOhvNIeu8EYuBxK1lRoZoiAkEOeo1ZihAvLLz0R', {debug: true});
      }
      return comm;
    };

    /**
     * Function: Icecomm.setDataListener(callback)
     * This function sets a callback to execute when the 'data' event is heard 
     *
     * @param callback: The function to run after hearing 'data' event 
     */
    function setDataListener(callback){
      getIcecommInstance().on('data', callback);
    };

    /**
     * Function: Icecomm.uninitialize()
     * This function will leave current room, stop local audio/video stream 
     * and call the 'disconnect' event on all users in room.
     *
     * @return: A boolean determining if the uninitialization was successful. 
     */
    function uninitialize(){
      if(!!comm){
        console.log('Stopping Video');
        
        comm.leave(true); 
        return true;
      }
      return false;
    };
  }
})();