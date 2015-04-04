// videoFactory.js
// This is a service designed to handle the video and audio transmission within a given room.
// It uses Icecomm.js to connect to a room and assigns event listeners which fire when icecomm sees
// another users joining. 

(function(){

  angular
    .module('hackbox')
    .factory('Video', Video);

  Video.$inject = [];

  function Video(){

    var instance = {
      initialize: initialize,
      uninitialize: uninitialize,
      getComm: getComm
    };

    return instance;

    ///// IMPLEMENTATION /////
    var comm = null;
    
    // Function: Video.initialize(roomName)
    // roomName: A string representing the room a user is joining. 
    // This function will initialize the comm object as a new Icecomm instance. 
    // It will also setup event listeners for the room to react when others join.
    function initialize(roomName){
      // If the comm object is not initialized, then create a new instance.
      if(!comm){
        console.log('Initializing Video');

        // Setup a new Icecomm instance
        comm = new Icecomm('glkfL9sBKg/o6i2Ma3OS3kMqqbeEDT1ofUODOQjAlmwESS7LBu', {debug: true});
        comm.connect(roomName, {audio: false});
        
        // Setup Icecomm event listeners for peer connects, disconnects, and local video.
        comm.on('connected', function(peer) {
          peerVideo.src = peer.stream;
        });

        comm.on('local', function(peer) {
          console.log(localVideo);
          localVideo.src = peer.stream;
        });

        comm.on('disconnect', function(peer) {
          peerVideo.src = '';
        });
      }
    };

    // Function: Video.uninitialize()
    // This function will leave current room, stop local audio/video stream 
    // and call the 'disconnect' event on all users in room.
    function uninitialize(){
      if(!!comm){
        console.log('Stopping Video');
        
        comm.leave();
        comm = null;
      }
    };

    // Function: Video.getComm()
    // This function returns the instance of Icecomm currently in use.
    function getComm(){
      return comm;
    };
  }
})();