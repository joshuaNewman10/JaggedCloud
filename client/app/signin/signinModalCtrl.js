// signinModalCtrl.js
// This is the controller responsible for the signin Modal that appears when
// the signin button is clicked. 

(function(){

  angular
    .module('hackbox')
    .controller('signinModalCtrl', SigninModalCtrl);

  SigninModalCtrl.$inject = ['$scope','$modalInstance'];

  function SigninModalCtrl($scope, $modalInstance){
    
    $scope.submit = function () {
      $modalInstance.close();
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }
})();