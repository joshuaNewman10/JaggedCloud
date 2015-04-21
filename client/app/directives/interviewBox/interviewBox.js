(function(){

  var app = angular.module('hackbox');

  app.directive('interviewBox', function() {
    return {
      restrict: 'E',
      templateUrl: '/app/directives/interviewBox/interviewBox.html',
      scope: {
        interview: '=',
        removeFn: '&'
      }
    };
  });

})();
