var Bookings = require('../models/booking');
var mongo = require('../db/mongo');

handle_request = ((id, callback) =>{

    console.log("Fetching booking details for " + id);
    const query = {user_id: id}
    Bookings.find(query, callback);
    
});

exports.handle_request = handle_request;