var Users = require('../models/user');
var mongo = require('../db/mongo');

handle_request = ((data, callback) =>{

    console.log("Fetching user details...");
    console.log(data);
    Users.findOne(data, callback);
});

exports.handle_request = handle_request;