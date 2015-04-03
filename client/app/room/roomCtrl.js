(function(){

  angular
    .module('hackbox')
    .controller('roomCtrl', RoomCtrl);

  RoomCtrl.$inject = ['$scope', 'Video'];

  function RoomCtrl($scope, Video){
    $scope.init = function(){
      Video.initialize('hackbox');
    };

    $scope.init();
  }
})();
