var connection      =   new require('./Kafka/Connection');
var kafka_topics    =   require('./KafkaTopics').kafka_topic_enums;
var mongoConnect    =   require('./db/mongoose'); 

//get producer object
let producer = connection.getProducer();

//get all consumer objects
// let login           =   require('./DB_Services/login');
// let signup          =   require('./DB_Services/signup');
let userdetails         =   require('./DB_Services/userdetails');
let updateuserdetails   =   require('./DB_Services/updateuserdetails');
let userdetailsbyid     =   require('./DB_Services/userdetailsbyid');
let sendmsg             =   require('./DB_Services/sendmsg');
let receivemsg          =   require('./DB_Services/receivemsg');
let listProperty        =   require('./DB_Services/listproperty');
let fetchProperty       =   require('./DB_Services/fetchproperty');
let fetchProperties     =   require('./DB_Services/fetchproperties');
let searchProperties    =   require('./DB_Services/searchproperties');
let fetchOwner          =   require('./DB_Services/fetchowner');
let fetchbookings       =   require('./DB_Services/fetchbookings');
//let bookproperty        =   require('./DB_Services/bookproperty');
let bookingdetails      =   require('./DB_Services/bookingdetails');

// let loginConsumer       =   connection.getConsumerObj(kafka_topics.LOGIN);
// let signupConsumer      =   connection.getConsumerObj(kafka_topics.SIGNUP);
let userdetailsConsumer             =   connection.getConsumer(kafka_topics.USERDETAILS);
let updateUserDetailsConsumer       =   connection.getConsumer(kafka_topics.UPDATEUSERDETAILS);
let userDetailsByIdConsumer         =   connection.getConsumer(kafka_topics.USERDETAILSBYID);
let sendMsgConsumer                 =   connection.getConsumer(kafka_topics.SENDMSG);
let receiveMsgConsumer              =   connection.getConsumer(kafka_topics.RECEIVEMSG);
//let listPropertyConsumer            =   connection.getConsumer(kafka_topics.LISTPROPERTY);
let fetchPropertyConsumer           =   connection.getConsumer(kafka_topics.FETCHPROPERTY);
let fetchPropertiesConsumer         =   connection.getConsumer(kafka_topics.FETCHPROPERTIES);
let fetchOwnerConsumer              =   connection.getConsumer(kafka_topics.FETCHOWNER);
let searchPropertiesConsumer        =   connection.getConsumer(kafka_topics.SEARCHPROPERTIES);
let fetchBookingsConsumer           =   connection.getConsumer(kafka_topics.FETCHBOOKINGS);
//let bookPropertyConsumer            =   connection.getConsumer(kafka_topics.BOOKPROPERTY);
let bookingDetailsConsumer          =   connection.getConsumer(kafka_topics.BOOKINGDETAILS);

/***calling handle_request for different consumers */

// loginConsumer.on('message', function(message){
//     var data = JSON.parse(message.value);

//     console.log('*** Login Message received');

//     console.log("TOPIC: " + data.replyTo);

//     login.handle_request(data.data, function(err, res){
//         console.log('*** After handle ' + res + '.***');
//             var payloads = [
//                 { topic: data.replyTo,
//                     messages:JSON.stringify({
//                         correlationId:data.correlationId,
//                         data : res
//                     }),
//                     partition : 0
//                 }
//             ];
//             producer.send(payloads, function(err, data){
//                 console.log(data);
//             });
//             return;
//     });
// });

// signupConsumer.on('message', function(message){
//     var data = JSON.parse(message.value);

//     console.log('*** Signup Message received');

//     console.log("TOPIC: " + data.replyTo);

//     signup.handle_request(data.data, function(err, res){
//         console.log('*** After handle ' + res + '.***');
//             var payloads = [
//                 { topic: data.replyTo,
//                     messages:JSON.stringify({
//                         correlationId:data.correlationId,
//                         data : res
//                     }),
//                     partition : 0
//                 }
//             ];
//             producer.send(payloads, function(err, data){
//                 console.log(data);
//             });
//             return;
//     });
// });

userdetailsConsumer.on('message', function(message){
    var data = JSON.parse(message.value);

    console.log('*** Request for fetching userdetails Message received.****');

    console.log("TOPIC: " + data.replyTo);

    userdetails.handle_request(data.data, function(err, res){
        console.log('*** After handling user details ' + res + '.***');
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
    });
});

updateUserDetailsConsumer.on('message', function(message){
    var data = JSON.parse(message.value);
    console.log(JSON.stringify(data));
    console.log('*** Request for updating userdetails Message received.****');

    console.log("TOPIC: " + data.replyTo);

    updateuserdetails.handle_request(data.data, function(err, res){
        console.log('*** After handling update user details ' + res + '.***');
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
    });
});

userDetailsByIdConsumer.on('message', function(message){
    var data = JSON.parse(message.value);

    console.log(JSON.stringify(data));
    console.log('*** Request for fetching userdetails by ID. Message received.****');
    console.log("TOPIC: " + data.replyTo);

    userdetailsbyid.handle_request(data.data, function(err, res){
        console.log('*** After handling user details ' + res + '.***');
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
    });
});

sendMsgConsumer.on('message', function(message){
    var data = JSON.parse(message.value);
    
    console.log(JSON.stringify(data));
    console.log('*** Request for sending msg. Message received.****');
    console.log("TOPIC: " + data.replyTo);

    sendmsg.handle_request(data.data, function(err, res){
        console.log('*** After handling send message: ' + res + '.***');
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
    });
});

receiveMsgConsumer.on('message', function(message){
    var data = JSON.parse(message.value);
    
    console.log(JSON.stringify(data));
    console.log('*** Request for receiving msg. Message received.****');
    console.log("TOPIC: " + data.replyTo);

    receivemsg.handle_request(data.data, function(err, res){
        console.log('*** After handling receive msg details ' + res + '.***');
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
    });
});


// listPropertyConsumer.on('message', function(message){
//     var data = JSON.parse(message.value);
//     console.log(JSON.stringify(data));

//     console.log('*** Request for listing property Message received.****');

//     console.log("TOPIC: " + data.replyTo);

//     listProperty.handle_request(data.data, function(err, res){
//         console.log('*** After handlling list property ' + res + '.***');
//             var payloads = [
//                 { topic: data.replyTo,
//                     messages:JSON.stringify({
//                         correlationId:data.correlationId,
//                         data : res
//                     }),
//                     partition : 0
//                 }
//             ];
//             producer.send(payloads, function(err, data){
//                 console.log(data);
//             });
//             return;
//     });
// });

fetchPropertyConsumer.on('message', function(message){
    var data = JSON.parse(message.value);

    console.log('*** Request for fetching property Message received.****');

    console.log("TOPIC: " + data.replyTo);

    fetchProperty.handle_request(data.data, function(err, res){
        console.log('*** After handling fetching property:  ' + res + '.***');
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
    });
});

fetchPropertiesConsumer.on('message', function(message){
    var data = JSON.parse(message.value);

    console.log('*** Request for fetching properties Message received.****');

    console.log("TOPIC: " + data.replyTo);

    fetchProperties.handle_request(data.data, function(err, res){
        console.log('*** After handling fetch properties:  ' + res + '.***');
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
    });
});

searchPropertiesConsumer.on('message', function(message){
    var data = JSON.parse(message.value);
    
    console.log(JSON.stringify(data));
    console.log('*** Request for searching properties. Message received.****');
    console.log("TOPIC: " + data.replyTo);

    searchProperties.handle_request(data.data, function(err, res){
        console.log('*** After handling search properties msg request. ' + res + '.***');
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
    });
});

fetchOwnerConsumer.on('message', function(message){
    var data = JSON.parse(message.value);
    
    console.log(JSON.stringify(data));
    console.log('*** Request for fetching owner details. Message received.****');
    console.log("TOPIC: " + data.replyTo);

    fetchOwner.handle_request(data.data, function(err, res){
        console.log('*** After handling fetching owner details. ' + res + '.***');
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
    });
});

fetchBookingsConsumer.on('message', function(message){
    var data = JSON.parse(message.value);
    
    console.log(JSON.stringify(data));
    console.log('*** Request for fetching booked properties. Message received.****');
    console.log("TOPIC: " + data.replyTo);

    fetchbookings.handle_request(data.data, function(err, res){
        console.log('*** After handling fetch booked properties msg request. ' + res + '.***');
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
    });
});


// bookPropertyConsumer.on('message', function(message){
//     var data = JSON.parse(message.value);
    
//     console.log(JSON.stringify(data));
//     console.log('*** Request for booking property. Message received.****');
//     console.log("TOPIC: " + data.replyTo);

//     bookproperty.handle_request(data.data, function(err, res){
//         console.log('*** After handling book property msg request. ' + JSON.stringify(res) + '.***');
//             var payloads = [
//                 { topic: data.replyTo,
//                     messages:JSON.stringify({
//                         correlationId:data.correlationId,
//                         data : res
//                     }),
//                     partition : 0
//                 }
//             ];
//             producer.send(payloads, function(err, data){
//                 console.log(data);
//             });
//             return;
//     });
// });


bookingDetailsConsumer.on('message', function(message){
    var data = JSON.parse(message.value);
    
    console.log(JSON.stringify(data));
    console.log('*** Request for fetching booking details. Message received.****');
    console.log("TOPIC: " + data.replyTo);

    bookingdetails.handle_request(data.data, function(err, res){
        console.log('*** After handling booking details msg request. ' + res + '.***');
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
    });
});





