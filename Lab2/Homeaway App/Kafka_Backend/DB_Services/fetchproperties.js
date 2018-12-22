var Properties = require('../models/property');
var mongo = require('../db/mongo');

handle_request = ((id, callback) =>{

    console.log("Fetching property details for " + id);
    const query = {owner_id: id}
    console.log("****Inside function : fetchProperties.****");    
    Properties.find(query, callback);
    
});

exports.handle_request = handle_request;