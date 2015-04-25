var mandrillAPI = require('./config.js');
var moment = require('moment-timezone');

exports.sendMessage = function(data) {
  var datePST = moment(data.roomStartTime).tz('America/Los_Angeles').format("dddd, MMMM Do YYYY, h:mma z");
  var message = {
    'html': "<p>" + data.candidateName + ",</p>\
    <p>You have an interview coming up!</p>\
    <p>" + data.interviewerName + " would like to schedule an interview with you on " + datePST + ".</p>\
    <p>Please follow this link at the time of the interview:</p>\
    <p>http://hackbox.herokuapp.com/#/room/" + data.roomId + "</p>\
    <p>Make sure you do the following:</p>\
    <p>1. Install Google Chrome or Firefox</p>\
    <p>      - If chrome prevents you from allowing your webcam/microphone, try Firefox.</p>\
    <p>2. Hit 'Allow' to give access to webcam/microphone. (Even if you do not have a webcam, this is important)</p>\
    <p>You may contact your interviewer for further instructions or questions at " + data.interviewerEmail + "</p>\
    <p>All the best, \
    <br>\
    The Hackbox Team\
    <br>\
    <a href='http://hackbox.herokuapp.com'/>http://hackbox.herokuapp.com/</a></p>",
    "subject": data.candidateName + ", you have a new scheduled interview!",
    "from_email": "hackboxinterviewteam@gmail.com",
    "from_name": "Hackbox Team",
    "to": [{
            "email": data.candidateEmail, //data.email
            "name": data.candidateName,
            "type": "to"
        }],
    "headers": {
        "Reply-To": "hackboxinterviewteam@gmail.com"
    }
  };

  var confirmationMessage = {
    'html': "<p>" + data.interviewerName + ",</p>\
    <p>You have an interview coming up!</p>\
    <p>You have scheduled an interview with " + data.candidateName + " on " +  datePST + ".</p>\
    <p>Please follow this link at the time of the interview. Feel free to prepare the interview ahead of time. You can write prompts, or even diagram things out beforehand.</p>\
    <p>http://hackbox.herokuapp.com/#/room/" + data.roomId + "</p>\
    <p>Make sure you do the following:</p>\
    <p>1. Install Google Chrome or Firefox</p>\
    <p>      - If chrome prevents you from allowing your webcam/microphone, try Firefox.</p>\
    <p>2. Hit 'Allow' to give access to webcam/microphone. (Even if you do not have a webcam, this is important)</p>\
    <p>You may contact your candidate at: " + data.candidateEmail + "</p>\
    <p>All the best, \
    <br>\
    The Hackbox Team\
    <br>\
    <a href='http://hackbox.herokuapp.com'/>http://hackbox.herokuapp.com/</a></p>",
    "subject": data.interviewerName + ", you have scheduled a new interview!",
    "from_email": "hackboxinterviewteam@gmail.com",
    "from_name": "Hackbox Team",
    "to": [{
            "email": data.interviewerEmail, //data.email
            "name": data.interviewerName,
            "type": "to"
        }],
    "headers": {
        "Reply-To": "hackboxinterviewteam@gmail.com"
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

  mandrillAPI.mandrill_client.messages.send({
    'message':confirmationMessage,
    'async': async
  }, function(result) {
    console.log('Email successfully sent!', result);
  }, function(error) {
    console.log('Mandrill email error occured!', error.name);
  });
};

