var expect = chai.expect;
/*
Unit test suite for the page the user first lands on (Home)
*/

//////////////////// Controllers ////////////////////
describe('homeCtrl', function() {
  beforeEach(module('hackbox'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

  describe('', function() {
    it('should have all the necessary methods', function() {
      var $scope = {};
      var controller = $controller('homeCtrl', { $scope: $scope});

      expect($scope.logout).to.not.be.undefined;
    });
  });
});

//////////////////// Factory/Service ////////////////////

describe('Video/Icecomm Service', function() {
    beforeEach(module('hackbox'));

    var Video;

    beforeEach(inject(function(_Video_) {
        Video = _Video_;
    }));

    it('should have all the necessary methods', function(){
        expect(Video.getIcecommInstance).to.not.be.undefined;
    });
});

