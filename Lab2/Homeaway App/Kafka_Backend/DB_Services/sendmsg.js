var Messages = require('../models/message');
var mongo = require('../db/mongo');

handle_request = ((newMsg, callback) =>{
    console.log("****  Inside function sendMsg.  ****");
    Messages.create(newMsg, callback);         
});

exports.handle_request = handle_request;