(function(){

  var app = angular.module('hackbox');

  app.filter('interviewFilter', function () {
    return function (items, time) {
      var filtered = [];
      var today = new Date();
      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        var startDay = new Date(item.start_time);
        var endDay = new Date(item.end_time);
        // Convert MS to just day
        // Add 24 hrs to it, this will be the MS for the next day
        // Past is now anything that is not today, but also before us by 24 hrs. 
        // Upcoming is anything that is not today, but also after us by 24 hrs. 

        switch(time){
          case 'Today':
            if (startDay.setHours(0,0,0,0) === today.setHours(0,0,0,0) && endDay.setHours(0,0,0,0) > startDay.setHours(0,0,0,0)) {
              filtered.push(item);
            }
            break;
          case 'Upcoming':
            if (startDay.setHours(0,0,0,0) > today.setHours(0,0,0,0)) {
              filtered.push(item);
            }
            break;
          case 'Completed':
            if (endDay.setHours(0,0,0,0) <= today.setHours(0,0,0,0)) {
              filtered.push(item);
            }
            break;
          default:
            break;
        }
      };
      return filtered;
    };
  });

})();
