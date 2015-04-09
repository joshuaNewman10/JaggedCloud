/**
 * dashboardCtrl.js
 *
 *This is the controller responsible for the interviewers dashboard
 *
 */

(function(){

  angular
    .module('hackbox')
    .controller('dashboardCtrl', DashboardCtrl);
  
  DashboardCtrl.$inject = ['$scope'];

  function DashboardCtrl($scope) {
    $scope.interviews = [
    {time: new Date(), interviewee: 'someone'},
    {time: new Date(), interviewee: 'someone'},
    {time: new Date(), interviewee: 'someone'}
    ];
  }
})();