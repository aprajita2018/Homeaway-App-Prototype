var Properties = require('../models/property');
var mongo = require('../db/mongo');

handle_request = ((values, callback) =>{

    const query = {
        city: values.city,
        fromDate: {$lt: values.fromDate},
        toDate: {$gt: values.toDate},
        numSleep: {$gt: values.numSleep}
    };
    console.log("****Inside function: searchProperties.****");
    Properties.find(query, callback) 
    
});

exports.handle_request = handle_request;