// videoFactory.js
// This is a service designed to handle the video and audio transmission within a given room.
// It uses Icecomm.js and maintains the instance to Icecomm.

(function(){

  angular
    .module('hackbox')
    .factory('Video', Video);

  Video.$inject = [];

  function Video(){

    var instance = {
      getIcecommInstance: getIcecommInstance,
      uninitialize: uninitialize
    };

    return instance;

    ///// IMPLEMENTATION /////
    var comm = null;

    // Function: Video.uninitialize()
    // This function will leave current room, stop local audio/video stream 
    // and call the 'disconnect' event on all users in room.
    // Returns: A boolean determining if the uninitialization was successful. 
    function uninitialize(){
      if(!!comm){
        console.log('Stopping Video');
        
        comm.leave(); 
        return true;
      }
      return false;
    };

    // Function: Video.getIcecommInstance()
    // This function returns an Icecomm object. If it does not exist, it creates one. 
    // Returns: The Icecomm instance if possible, or else null. 
    function getIcecommInstance(){
      if(!comm){
        comm = new Icecomm('glkfL9sBKg/o6i2Ma3OS3kMqqbeEDT1ofUODOQjAlmwESS7LBu', {debug: true});
      }
      return comm;
    };
  }
})();