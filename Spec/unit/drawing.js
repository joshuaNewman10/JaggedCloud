var expect = chai.expect;

/*
Unit test suite for drawing controller in room view
*/

describe('drawingCtrl', function() {
  beforeEach(module('hackbox'));

  var $controller;

  beforeEach(inject(function(_$controller_) {
    //The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

  describe('', function() {
    it('should have all the necessary methods and properties', function() {
      var $scope = {};
      var controller = $controller('drawingCtrl', {$scope: $scope});

      console.log('drawing controller scope:', $scope);

      //Methods
      expect($scope.init).to.not.be.undefined;
      expect($scope.uninit).to.not.be.undefined;
      expect($scope.initializeIO).to.not.be.undefined;
      expect($scope.addCanvas).to.not.be.undefined;
      expect($scope.toggleDrawingMode).to.not.be.undefined;

      //Properties
      expect($scope.drawingCanvas).to.not.be.undefined;
    });

    it('should set the canvas property to the fabric canvas after being initialized', function() {
      var $scope = {};
      var controller = $controller('drawingCrl', {$scope: $scope});

      expect($scope.drawingCanvas).to.not.be.undefined;
      console.log('drawign canvas', $scope.drawingCanvas);
    });
  });

  // describe('addCanvas', function() {
  //   it('should create a fabric canvas and set the value of the scope variable', function() {
  //     var $scope = {};
  //     var controller = $controller('drawingCtrl', {$scope: $scope});

  //     $
  //   });

  // });
});