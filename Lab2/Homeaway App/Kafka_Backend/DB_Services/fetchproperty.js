var Properties = require('../models/property');
var mongo = require('../db/mongo');

handle_request = ((id, callback) =>{

    console.log("Fetching property details for " + id);
    const query = {_id: id}
    Properties.findOne(query, callback);
    
});

exports.handle_request = handle_request;