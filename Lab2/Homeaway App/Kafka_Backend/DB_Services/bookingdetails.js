var Bookings = require('../models/booking');
var mongo = require('../db/mongo');

handle_request = ((id, callback) =>{

    console.log("Fetching property details for " + id);
    const query = {owner_id: id}
    //console.log("****Inside function : fetchProperties.****");    
    Bookings.find(query, callback);
    
});

exports.handle_request = handle_request;