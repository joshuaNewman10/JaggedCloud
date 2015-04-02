(function(){

  angular
    .module('hackbox')
    .controller('signinCtrl', SigninCtrl);

  SigninCtrl.$inject = ['$scope', 'ui.bootstrap'];

  function SigninCtrl($scope, $modal){
    $scope.open = function (size) {

      var modalInstance = $modal.open({
        templateUrl: 'myModalContent.html',
        controller: 'ModalInstanceCtrl',
        size: size,
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };
  }
})();