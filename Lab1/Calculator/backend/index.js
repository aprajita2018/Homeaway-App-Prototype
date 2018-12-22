var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var math = require('mathjs');

//use cors for cross origin resourse sharing
app.use(cors({origin: 'http://localhost:3000', credentials: true}));

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

//route to handle operation's get request calls
app.get('/calc', function(req, res){
    console.log("Request received", req.query.expression);
    var result ={
        'expr': req.query.expression,
        'status': null,
        'message': null,
    };        
    result['expr'] = math.eval(req.query.expression);

    //handling divide by zero error
    if(result['expr'] === Infinity || isNaN(result['expr']) || result['expr'] === -Infinity){   result['expr'] = req.query.expression;
        result['message'] = "Can't divide by 0!";
        result['status'] = "ERROR";
        console.log(result);
        res.json(result);
    }
    else{
        result['status'] = "OK";
        result['message'] = "Calculation successful!";
        console.log(result);
        res.json(result);
    }
});

//start the server on port 3001
app.listen(3001);
console.log("Server listening on port # 3001");