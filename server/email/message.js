var mandrillAPI = require('./config.js');

exports.sendMessage = function(data) {
  var email = ''; //for testing purposes
  var message = {
    'to': [{
      'email': data.email,
      'name': data.fullname,
      'type': 'to'
    }],
    'from_email': '',
    'from_name': 'Jagged Cloud Team',
    'subject': 'New Interview Scheduled!',
    'html': '<p>' + data.fullname + '</p>\
    <p>You have a new interview scheduled</p>'
  };

  var async = false;

  mandrillAPI.mandrill_client.message.send({
    'message':message,
    'async': async,
    function(result) {
      console.log('email successfully sent: ', result);
    }, function(error) {
      console.log('Mandrill Email error occured: ', e.name);
    }
  });
};