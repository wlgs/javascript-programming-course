// Application using the 'Pug' template system
var express = require('express'),
    logger = require('morgan');
const fs = require('fs');
var app = express();
var x = 1;
var y = 2;


var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/js";


// Configuring the application
app.set('views', __dirname + '/views'); // Files with views can be found in the 'views' directory
app.set('view engine', 'pug');          // Use the 'Pug' template system

// Determining the contents of the middleware stack
app.use(logger('dev'));                         // Add an HTTP request recorder to the stack — every request will be logged in the console in the 'dev' format
// app.use(express.static(__dirname + '/public')); // Place the built-in middleware 'express.static' — static content (files .css, .js, .jpg, etc.) will be provided from the 'public' directory


MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("js");

    // Route definitions
    app.get('/', function (req, res) {      // The first route
        res.render('index', { pretty: true, xval: x, yval: y }); // Render the 'index' view in 'pretty' mode — the resulting HTML code will be indented — the 'pretty' option has the 'deprecated' status — in the future it will not be supported
        //res.render('index '); // Render the 'index' view; because the 'pretty' mode is, by default, turned off so the resulting HTML will be without indentation
    });

    app.get('/json/:name', function (req, res) {
        let rawdata = fs.readFileSync("./json/" + req.params.name + ".json");
        let json = JSON.parse(rawdata);

        res.render('json', { data: json });
    });


    app.get('/results', async function (req, res) {
        var ops = new Array();
        var deferreds = [];
        var receivedData = new Promise((resolve, reject) => {
            deferreds.push({ resolve: resolve, reject: reject });
        });
        dbo.collection("data").find({}).toArray(function (err, res) {
            if (err) throw err;
            res.forEach(el => {
                ops.push({arg1: el.x, arg2: el.y, type: el.operation});
            });
            deferreds[0].resolve();
        });
        await receivedData;
        console.log(ops);
        res.render('sent', { data: ops });
        // Send a response to the browser
    });

    app.get('/calculate/:operation/:x/:y', function (req, resp) {     // The first route
        var res = 0;
        let operation = req.params.operation;
        let x = Number(req.params.x);
        let y = Number(req.params.y);
        if (operation == "+")
            res = x + y;
        else if (operation == "*")
            res = x * y;
        else if (operation == "div")
            res = x / y;
        else if (operation == "-")
            res = x - y;
        var toInsert = {
            operation: operation,
            x: x,
            y: y,
        }
        dbo.collection("data").insertOne(toInsert, (err, res) => {
            if (err) throw err;
            console.log(res);
        });
        resp.render('mong', {data: toInsert, res: res});
    });

    app.listen(3000, function () {
        console.log('The application is available on port 3000');
    });
});