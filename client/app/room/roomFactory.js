(function(){

  angular
    .module('hackbox')
    .factory('Room', Room);

  Room.$inject = ['$http'];

  function Room(){

    var instance = {
      createRoom: createRoom,
      getRoom: getRoom,
      saveRoom: saveRoom
    };

    return instance;

    ///// IMPLEMENTATION /////
    function createRoom(room){
      return $http({
        method: 'POST',
        url: '/room/create',
        data: room
      }).then(function(response){
        return response;        
      });
    }

    function saveRoom(room){
      return $http({
        method: 'POST',
        url: '/room/save',
        data: room
      }).then(function(response){
        return response;        
      });
    }
    
    function getRoom(roomId){
      return $http({
        method: 'GET',
        url: '/room',
        data: roomId
      }).then(function(response){
        return response;        
      });
    }

  }
})();