(function(){

  angular
    .module('hackbox')
    .factory('Video', Video);

  Video.$inject = [];

  function Video(){

    var instance = {
      initialize: initialize,
      unInitialize: unInitialize,
      getComm: getComm
    };

    return instance;

    ///// IMPLEMENTATION /////
    var comm = null;
    
    function initialize(roomName){
      if(!comm){
        console.log('Initializing Video');
        comm = new Icecomm('glkfL9sBKg/o6i2Ma3OS3kMqqbeEDT1ofUODOQjAlmwESS7LBu', {debug: true});
        comm.connect(roomName, {audio: false});
        
        comm.on('connected', function(peer) {
          peerVideo.src = peer.stream;
        });

        comm.on('local', function(peer) {
          localVideo.src = peer.stream;
        });

        comm.on('disconnect', function(peer) {
          peerVideo.src = '';
        });
      }
    };

    function unInitialize(){
      if(!!comm){
        console.log('Stopping Video');
        comm.leave();
        comm = null;
      }
    };

    function getComm(){
      return comm;
    };
  }
})();