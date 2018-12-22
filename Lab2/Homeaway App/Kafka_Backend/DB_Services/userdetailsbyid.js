var Users = require('../models/user');
var mongo = require('../db/mongo');

handle_request = ((id, callback) =>{

    console.log("Fetching user details by id...");
    Users.findOne(id, callback);
});

exports.handle_request = handle_request;