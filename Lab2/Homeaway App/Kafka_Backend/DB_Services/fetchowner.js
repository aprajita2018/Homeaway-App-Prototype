var Users = require('../models/user');
var mongo = require('../db/mongo');

handle_request = ((id, callback) =>{

    console.log("Fetching user details...");
    console.log(id);
    const query = {_id: id}
    Users.findOne(query, callback);
    // };
});

exports.handle_request = handle_request;