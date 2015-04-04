// authFactory.js
// This factory/service is responsible for handling all the client-side authentication.

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

    // Function: Auth.signIn(user)
    // user: The user object to send to the server
    // This function will make a POST request to the server to signin the user
    function signIn(){
      return $http({
        method: 'GET',
        url: '/auth/github'
      }).then(function(response){
        return response;        
      });
    }
    
    // Function: Auth.logout()
    // This function will unauthenticate the user
    function logout(){
      $window.localStorage.removeItem('hackboxAuth');
      $state.go('home', {}, {reload: true});
    }

    // Function: Auth.isAuthenticated()
    // This function will unAuthenticate the user by removing the local storage object. 
    function isAuthenticated(){
      return true;
     // return !!$window.localStorage.getItem('hackboxAuth');
    }
  }
})();