var mandrillAPI = require('./config.js');

exports.sendMessage = function(data) {
  var message = {
    'html': "<p>" + data.fullname + ",</p>\
    <p>You have an interview coming up!</p>\
    <p>All the best, \
    <br>\
    The Hackbox Team\
    <br>\
    <a href='http://hackbox.herokuapp.com'/>http://hackbox.herokuapp.com/</a></p>",
    "subject": data.fullname + ", you have a new scheduled interview!",
    "from_email": "HackboxTeam@gmail.com",
    "from_name": "Hackbox Team",
    "to": [{
            "email": data.email, //data.email
            "name": data.fullname,
            "type": "to"
        }],
    "headers": {
        "Reply-To": "HackboxTeam@gmail.com"
    }
  };


  var async = false;
  mandrillAPI.mandrill_client.messages.send({
    'message':message,
    'async': async
  }, function(result) {
    console.log('Email successfully sent!', result);
  }, function(error) {
    console.log('Mandrill email error occured!', error.name);
  });
};

