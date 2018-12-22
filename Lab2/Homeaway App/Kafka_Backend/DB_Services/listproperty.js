var Properties = require('../models/user');
var mongo = require('../db/mongo');

handle_request = ((newProperty, callback) =>{

    console.log("Listing property with details...");  
    Properties.create(newProperty, callback);
   
});

exports.handle_request = handle_request;