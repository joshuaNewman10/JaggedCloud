(function(){

  var app = angular.module('hackbox');

  app.filter('interviewFilter', function () {
    return function (items, time) {
      var filtered = [];
      var now = Date.now();
      for (var i = 0; i < items.length; i++) {
        var item = items[i];

        // Filter interviews that have already finished
        if ( (time === 'past') && (now > item.start_time)) {
          filtered.push(item);
        }

        // Filter interviews that have not yet began
        else if ( (time === 'present') && (now <= item.start_time)) {
          filtered.push(item);
        }
      }
      return filtered;
    };
  });

})();
