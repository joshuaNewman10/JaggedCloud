/**
 * signinModalCtrl.js
 *
 * This is the controller responsible for the signin Modal that appears when
 * the signin button is clicked. 
 */

(function(){

  angular
    .module('hackbox')
    .controller('signinModalCtrl', SigninModalCtrl);

  SigninModalCtrl.$inject = ['$scope','$modalInstance', 'Auth'];

  function SigninModalCtrl($scope, $modalInstance, Auth){
    $scope.loading = false;

    $scope.submit = function () {
      Auth.signIn();
    };

    $scope.showLoading = function(){
      $scope.loading = true;
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }
})();