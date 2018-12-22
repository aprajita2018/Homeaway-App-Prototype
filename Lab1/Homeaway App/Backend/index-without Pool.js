var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var mysql = require('mysql');
var bcrypt = require('bcrypt');
const saltRounds = 10;

const axios = require('axios');

const multer = require('multer');
const cloudinary = require('cloudinary');

//config for cloudinary account
cloudinary.config({
    cloud_name: 'sjsu-aprajita',
    api_key: '498929163855749',
    api_secret: 'HgpUivWS6WF2Az5Z4ZJgqbOGFos',
  });

var con = mysql.createConnection({
    port: '3306',
    host: 'db4free.net',
    user: 'homeaway_admin',
    password: 'z5yh6vsPaWys3NR',
    database: 'homeaway_hw_db'
})

//use cors for cross origin resourse sharing
app.use(cors({origin: 'http://localhost:3000', credentials: true}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//use express-session to maintain session data
app.use(session({
    secret              : 'cmpe273_react_express',
    resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration      :  5 * 60 * 1000
}));

//allow access control
app.use(function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});


//handle login and compare the login password using bcrypt
app.post('/login',function(req,res){
    console.log("Inside Login Post Request for " + req.body.email + " with role " + req.body.user_type);
    con.connect(function(err) {
        if(err){
            throw err;
        }
        console.log("Connected!!!");
        var email = req.body.email;
        var pwd = req.body.password;
        var user_type = req.body.user_type;
    
        var sql = "SELECT user_id AS id, f_name, l_name, password, user_type FROM user WHERE email =" 
        + mysql.escape(email) + "and user_type = " + mysql.escape(user_type);

        con.query(sql,function(err,result){
            if(err){
                res.writeHead(404,{
                    'Content-Type' : 'text/plain'
                })
                res.end("User Not Found");
            }
            else{

                bcrypt.compare(pwd, result[0].password,function(err, dbresult){
                    if(dbresult === false){
                        res.writeHead(500,{
                            'Content-Type' : 'text/plain'
                        })
                        res.end("Invalid Credentials");
                    }
                    else{
                        res.cookie('name',result[0].f_name + " " + result[0].l_name,{maxAge: 900000, httpOnly: false, path : '/'});
                        res.cookie('user_type',result[0].user_type,{maxAge: 900000, httpOnly: false, path : '/'});
                        req.session.user = result[0];
                        res.setHeader('status', 200);
                        res.redirect('/');
                    }
                });                    
            };            
        });
    });
});

//handle logout and destroy the session
app.post('/logout',function(req,res){
    console.log("Inside Logout request for user id:" + req.session.user.id);
    if(req.session){
        req.session.destroy(function(err){
            if(err){
                return next(err);
            }
            else {
                return res.redirect("/");
            }
        });
    }
});

//handle searchBar and fetch the data matching the search query
app.get('/searchBar', function(req, res){
    console.log("Inside get request for search bar.");
    console.log(req.query);
    var sql = "SELECT property_id FROM propertydetails WHERE city = " + mysql.escape(req.query.city) + " AND fromDate <= " + mysql.escape(req.query.fromDate) + " AND toDate >= " + mysql.escape(req.query.toDate) + " AND numSleep >= " + mysql.escape(req.query.numSleep);
    console.log(sql);
    
    con.query(sql, function(err,result){
        if(err){
            res.writeHead(400,{
                'Content-type': 'text/plain'
            })
            res.end("Error in fetching search results.");
        }
        else{
            var ids = [];
            for(var i=0; i< result.length; i++){
                ids.push(result[i].property_id);
            }
            console.log("Sending search results: " + ids);

            res.send(JSON.stringify(ids));
        }
    })
});


//handle the propertyDetails and fetch all the propety data from propertydetails
app.get('/propertyDetails', function(req, res){
    console.log("Request received for property ID: ", req.query.id);

    var id = req.query.id;
    var sql = "SELECT * FROM propertydetails WHERE property_id = " + mysql.escape(id);

    con.query(sql,function(err,result){
        if(err){
            res.writeHead(400,{
                'Content-type' : 'text/plain'
            })
            res.end("Error in fetching property details for property_id: " + id);
        }
        else{
            console.log("Sending details: " + result[0])
            res.send(result[0]);
        }
    });
});


//handle the userDetails and fetch all the details for a user
app.get('/userDetails', function(req, res){
    console.log("Request received for user: ", req.session.user);

    var id = req.session.user.id;
    var sql = "SELECT * FROM user WHERE user_id = "
    + mysql.escape(id);
    con.query(sql,function(err,result){
        if(err){
            res.writeHead(400,{
                'Content-type' : 'text/plain'
            })
            res.end("Error in fetching user details for " + id);
        }
        else{
            console.log("Sending details: " + result[0])
            res.send(result[0]);
        }
    });
});

//handle the ownerDetails and fetch the owner details from the user table
app.get('/ownerDetails', function(req, res){
    console.log("Request received for owner id: ", req.body.id);

    var id = req.query.id;
    var sql = "SELECT f_name, l_name, email, gender, phone_num, hometown, city, state, languages, aboutMe FROM user WHERE user_id = "
    + mysql.escape(id);
    con.query(sql,function(err,result){
        if(err){
            res.writeHead(400,{
                'Content-type' : 'text/plain'
            })
            res.end("Error in fetching owner details for owner id: " + id);
        }
        else{
            console.log("Sending details: " + result[0])
            res.send(result[0]);
        }
    });
});

//route to handle updateProfile and insert the updated user info into the user table
app.post('/updateProfile', function(req,res){
    console.log("Inside update user profile request for " + req.body.params.email);

    var id = req.session.user.id;
    var sql = "UPDATE user SET f_name=" + mysql.escape(req.body.params.fname) +", l_name="+ mysql.escape(req.body.params.lname) 
    + ", email =" + mysql.escape(req.body.params.email) + ",phone_num =" + mysql.escape(req.body.params.phone)
    + ", aboutMe =" + mysql.escape(req.body.params.aboutMe) + ", city=" + mysql.escape(req.body.params.city) + ", state=" + mysql.escape(req.body.params.state)
    + ", hometown =" + mysql.escape(req.body.params.hometown) + ", languages=" + mysql.escape(req.body.params.languages) + ", gender=" + mysql.escape(req.body.params.gender)
    + ", photoURL = " + mysql.escape(req.body.params.photoURL)
    + " WHERE user_id = " + mysql.escape(req.session.user.id);

    console.log(sql);
    con.query(sql,function(err,result){
        if(err){
            res.writeHead(400,{
                'Content-Type': 'text/plain'
            });
            res.end("Unsuccessful update.");
        }
        else{
            console.log("Successfuly updated the user profile for " + req.body.params.email);
            res.cookie('name',req.body.params.fname + " " + req.body.params.lname,{maxAge: 900000, httpOnly: false, path : '/'});
            req.session.user.f_name = req.body.params.fname;
            req.session.user.l_name = req.body.params.lname;
            res.end("Successful update!");
            //res.redirect('/');
        }
    });
});

//route handle the bookedTrips and fetch the booking_id (for a booked trip) for a user
app.get('/bookedTrips', function(req, res){
    console.log("Inside Booked Trips get request");
    console.log(req.session.user.id);
    var sql = "SELECT booking_id FROM bookingdetails WHERE user_id = " + mysql.escape(req.session.user.id);

    console.log(sql);
    con.query(sql, function(err, result){
        if(err){
            res.writeHead(400, {
                'Content-type' : 'text/plain'
            })
            res.send("Error in fetching bookind id for user" + req.session.user.id);
        }
        else{
            console.log("Successful in fetching the Booking Id");
            res.send(result[0]);
        }
    });
});

//route to handle bookingDetails and fetch the booking related information for a 'traveler' type user
app.get('/bookingDetails', function(req, res){
    console.log("Inside booking details request for- ", req.session.user.id);
    var sql = "SELECT B.*, P.type, P.title, P.description, P.numSleep, P.numBath, P.numBed, P.city, P.streetAddress, P.state, P.photoURL " 
    + " FROM bookingdetails AS B" 
    + " JOIN propertydetails AS P ON (B.property_id = P.property_id)"
    + " WHERE booking_id = " + mysql.escape(req.query.id); 

    console.log(sql);

    con.query(sql, function(err, result){
        if(err){
            res.writeHead(400,{
                'Content-type' : 'text/plain'
            })
            res.end("Error in fetching the requested booking & property details.");
        }
        else{
            console.log("Successfuly fetched the booking & property details..");
            res.send(result[0]);
        }
    });
});

//route to handle userSignup, encrypting the password using bcrypt, and insert the user details into the user table
app.post('/userSignup', function(req, res){
    console.log("Request received to create the user: " + req.body.email);
    var phone = req.body.phone || "";
    var pwdHash;

    bcrypt.hash(req.body.password, saltRounds, function(err,hash){
        if(err){
            console.log("errrrrr");
        }
        else{
            pwdHash = hash;  
    
            var sql = "INSERT INTO user (user_type, f_name, l_name, email, password, phone_num, joined_date) VALUES ("
            + mysql.escape(req.body.user_type) + ","
            + mysql.escape(req.body.fname) + "," + mysql.escape(req.body.lname) + ","
            + mysql.escape(req.body.email) + "," + mysql.escape(pwdHash) + ","
            + mysql.escape(phone) + ", curdate() )";

            con.query(sql, function(err, result){
                if(err){
                    res.writeHead(400,{
                        'Content-Type' : 'text/plain'
                    })
                    res.end("Error in inserting the user details, failed sign-up for " + req.body.email + ".");
                }
                else{
                    res.setHeader('status', 200);
                    if(req.body.user_type === 'owner')
                        res.redirect('/ownerLogin');
                    else
                        res.redirect('travellerLogin');              
                }
            })
        }
    })
});

//Configure Multer upload
const upload = multer({ 
    storage: multer.memoryStorage(), 
    limits: {fileSize: 5 * 1024 * 1024},
    }).single('images');

//route to handle uploadFiles and return the uploaded url
app.post('/uploadFiles', function(req, res){
    upload(req, res, function(err){
        console.log("Processing file: " + req.file.originalname);
        if(err) {
            return res.end("Error uploading file.");
        }
        cloudinary.uploader.upload_stream((result) => {
            console.log("Received URL: " + result.secure_url);
            res.status(200).json({ success: true, fileUrl: result.secure_url});
        }).end(req.file.buffer);
    });
});

app.post('/api/updateImageURL', function(req, res){
    // console.log(req.body);
    //res.writeHead(200, "OK");
    res.end(JSON.stringify(req.body.url));
})

//route to handle listingProperty and insert the property details into the propertydetails table 
app.post('/listingProperty', function(req, res){
    console.log("Request received to list the property for user:" + req.session.user.f_name + " " + req.session.user.l_name);
    var inputVars = req.body.params;

    var sql = "INSERT INTO propertydetails (type, title, description, owner_id, numSleep, numBath, numBed, minStay, city, streetAddress, state, price, fromDate, toDate, photoURL) VALUES("
            +  mysql.escape(inputVars.type) + ", " + mysql.escape(inputVars.title) + ", " +  mysql.escape(inputVars.description) + ", " + mysql.escape(req.session.user.id) + ", " 
            + mysql.escape(inputVars.numSleep) + ", " + mysql.escape(inputVars.numBath) + ", " + mysql.escape(inputVars.numBed) + ", " + mysql.escape(inputVars.minStay) + ", "
            + mysql.escape(inputVars.city) + ", " + mysql.escape(inputVars.streetAddress) + ", " + mysql.escape(inputVars.state) + ", " + mysql.escape(inputVars.price) + ", " + mysql.escape(inputVars.fromDate) + ", " + mysql.escape(inputVars.toDate) + ", " + mysql.escape(inputVars.photoURL) + " ) ";

    console.log(sql);
    con.query(sql, function(err, result){
        if(err){
            res.writeHead(400,{
                'Content-type': 'text/plain'    
            })
            res.end("Error in listing the property");
        }
        else{
            res.setHeader('status',200);
            res.send("Successfully created the property listing");                        
        }
    });
});

//route to handle ownerProperties and fetch property_id from propertydetails 
app.get('/ownerProperties', function(req, res){
    var sql = "SELECT property_id FROM propertydetails WHERE owner_id =" + req.session.user.id;

    con.query(sql, function(err, result){
        if(err){
            res.writeHead(400,{
                'Content-type' : 'text/plain'
            })
            res.end("Unable to fetch owner properties.");
        }
        else{
            res.writeHead(200,{
                'Content-Type' : 'application/json'
            })
            res.end(JSON.stringify(result));
        }
    });
});

//route to handle bookNow & to insert into bookingdetails table
app.post('/bookNow', function(req, res){
    console.log("Inside Book Now request for:" + req.session.user.id);
    
    var sql = "INSERT INTO bookingdetails(property_id, user_id, owner_id, pricePerNight, fromDate, toDate, priceTotal) VALUES ("
    + mysql.escape(req.body.params.property_id) + "," + mysql.escape(req.session.user.id) + ","
    + mysql.escape(req.body.params.owner_id) + "," + mysql.escape(req.body.params.pricePerNight) + ","
    + mysql.escape(req.body.params.fromDate) +"," + mysql.escape(req.body.params.toDate) + "," + mysql.escape(req.body.params.priceTotal) + ")";

    console.log(sql);

    con.query(sql, function(err, result){
        if(err){
                res.writeHead(400, {
                'Content-type' : 'text/plain'
            })
        res.send("Error in inserting the booking details. Failed property booking for:" + req.session.user.id );
        }
        else{
            res.setHeader('status', 200);
            res.send("Successful Booking!");
        }
    });
});

//start the server on port 3001
app.listen(3001);
console.log("Server listening on port # 3001");