/**
 * authFactory.js
 *
 * This factory/service is responsible for handling all the client-side authentication.
 */

(function(){

  angular
    .module('hackbox')
    .factory('Auth', Auth);

  Auth.$inject = ['$http', '$location', '$window', '$state'];

  function Auth($http, $location, $window, $state){

    var instance = {
      signIn: signIn,
      logout: logout,
      isAuthenticated: isAuthenticated
    };

    return instance;

    ///// IMPLEMENTATION /////

    /**
     * Function: Auth.signIn()
     * This function will make a POST request to the server to signin the user
     */
    function signIn(){
      return $http({
        method: 'GET',
        withCredentials: true,
        url: '/auth/github'
      }).then(function(response){
        return response;        
      });
    }
    
    /**
     * Function: Auth.logout()
     * This function will unauthenticate the user
     */
    function logout(){
      return $http({
        method: 'GET',
        url: '/auth/logout'
      }).then(function(response){
        $state.go('home', {}, {reload: true});
        return response;        
      });
    }
    
    /**
     * Function: Auth.isAuthenticated()
     * This function will unAuthenticate the user by removing the local storage object. 
     */
    function isAuthenticated(){
      return $http({
        method: 'POST',
        url: '/auth/checkloggedin'
      });
    }
  }
})();