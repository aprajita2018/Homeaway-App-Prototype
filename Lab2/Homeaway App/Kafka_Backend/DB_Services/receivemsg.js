var Messages = require('../models/message');
var mongo = require('../db/mongo');

handle_request = ((id, callback) =>{

    console.log("Fetching user messages details...");
    const query = {$or: [{recipientID: id}, {senderID: id}]}
    console.log("****   Inside function : receiveMsg.  ****");    
    Messages.find(query, callback).sort({timestamp: 'desc'});
});

exports.handle_request = handle_request;