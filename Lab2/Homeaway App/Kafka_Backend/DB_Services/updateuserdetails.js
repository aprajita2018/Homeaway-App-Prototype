var Users = require('../models/user');
var mongo = require('../db/mongo');

handle_request = ((data, callback) =>{

    console.log("Updating user details...");
    var id = data.id;
    var user = data.user;
    console.log("\n The user Id: " + id + " and user details are: " + JSON.stringify(user) + " .");
    Users.findByIdAndUpdate(id, user,callback);
});

exports.handle_request = handle_request;