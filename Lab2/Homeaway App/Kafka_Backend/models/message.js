var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var db = mongoose.connection;

const config = require('../config/config');

//create a schema
var messageSchema = new Schema({
    propertyID      :   {type:String, required: true},
    recipientID     :   {type:String, required: true},
    senderID        :   {type:String, required: true},
    timestamp       :   {type: Date},
    msgBody         :   {type:String, required: true},    
});

//create a model 
var Messages = mongoose.model('Message',messageSchema);

//export the model
module.exports = Messages;

//define create msg
module.exports.sendMsg = function(newMsg, callback){
    console.log("****Inside function sendMsg.****");
    newMsg.save(callback);     
};

