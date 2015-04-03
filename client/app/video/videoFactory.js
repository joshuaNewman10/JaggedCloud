(function(){

  angular
    .module('hackbox')
    .factory('Video', Video);

  Video.$inject = [];

  function Video(){

    var instance = {

    };

    return instance;

    ///// IMPLEMENTATION /////
    var comm = null;

    function initialize(){
      if(!comm){
        var comm = new Icecomm('glkfL9sBKg/o6i2Ma3OS3kMqqbeEDT1ofUODOQjAlmwESS7LBu');
      }
    };

    function unInitialize(){
      if(!!comm){
        var comm = new Icecomm('glkfL9sBKg/o6i2Ma3OS3kMqqbeEDT1ofUODOQjAlmwESS7LBu');
      }
    };

    function getComm(){
      return comm;
    };
  }
})();