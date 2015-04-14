(function(){

  angular
    .module('hackbox')
    .factory('Room', Room);

  Room.$inject = ['$http'];

  function Room($http){

    var instance = {
      createRoom: createRoom,
      getRoom: getRoom,
      saveRoom: saveRoom,
      getUpcomingInterviews: getUpcomingInterviews,
      deleteRoom: deleteRoom
    };

    return instance;

    ///// IMPLEMENTATION /////
    function createRoom(room, callback){
      console.log('Creating room!',room);
      return $http({
        method: 'POST',
        url: '/room/create',
        data: room
      }).then(function(response){
        callback(response);
      });
    }

    function saveRoom(room){
      console.log('Saving current room!',room);
      return $http({
        method: 'POST',
        url: '/room/save',
        data: room
      }).then(function(response){
        return response;        
      });
    }
    
    function getRoom(roomId, callback){
      console.log('Getting room data for room: ', roomId);

      return $http({
        method: 'GET',
        url: '/room/get' + roomId
      }).then(function(response){
        callback(response);
      });        
    }

    function getUpcomingInterviews(callback){
      console.log('Getting snapshot of all incomplete interviews for current user');
      return $http({
        method: 'GET',
        url: '/room/home'
      }).then(function(response){
        callback(response);
      });        
    }

    function deleteRoom(roomId, callback){
      console.log('Deleting Room: ', roomId);

      return $http({
        method: 'DELETE',
        url: '/room/remove' + roomId
      }).then(function(response){
        callback(response);
      });        
    }
  }
})();