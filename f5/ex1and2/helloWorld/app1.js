var express = require('express'),
    logger = require('morgan');
const fs = require('fs');
var app = express();
var x = 1;
var y = 2;


var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/js";





// Determining the contents of the middleware stack
app.use(logger('dev'));                         // Place an HTTP request recorder on the stack — each request will be logged in the console in 'dev' format
// app.use(express.static(__dirname + '/public')); // Place the built-in middleware 'express.static' — static content (files .css, .js, .jpg, etc.) will be provided from the 'public' directory

// Route definitions
app.get('/', function (req, res) {     // The first route
    res.send(`\n<h1>${x} + ${y} = ${x+y}</h1>`); // Send a response to the browser
});



app.get('/results', async function (req, res) {
    var response = `
    <table>
    <tr>
    <th> X</th>
    <th> OPERATION</th>
    <th> Y</th>
    </tr>
    `;
    var deferreds = [];
    var receivedData = new Promise((resolve, reject) => {
        deferreds.push({resolve: resolve, reject: reject});
    });
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("js");
        dbo.collection("data").find({}).toArray(function(err, res) {
            if (err) throw err;
            res.forEach(el => {
                console.log(el);
                response += `<tr> <td>${el.x}</td><td>${el.operation}</td><td>${el.y}</td> </tr>`;
            });
            deferreds[0].resolve();
            db.close();
          });
      });
      await receivedData; 
      res.send(response + "</table>");
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
        y: y
    }

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("js");
        dbo.collection("data").insertOne(toInsert, (err, res) => {
            if (err) throw err;
            console.log(res);
        })
      }); 

    resp.send(`\n<h1>${x} ${operation} ${y} = ${res}</h1>`); // Send a response to the browser

});




app.get('/json/:name', function (req, res) {    
    
    let rawdata = fs.readFileSync("./json/" + req.params.name + ".json");
    let json = JSON.parse(rawdata);
    
    var response = `
    <table>
    <tr>
    <th>x</th>
    <th>Operation</th>
    <th>y</th>
    <th>Result</th>
    </tr>
    `;
    json.operations.forEach(operation => {
        var res = 0;
        if (operation.type == "+")
            res = operation.arg1 + operation.arg2;
        else if (operation.type == "*")
            res = operation.arg1 * operation.arg2;
        else if (operation.type == "/")
            res = operation.arg1 / operation.arg2;
        else if (operation.type == "-")
            res = operation.arg1 - operation.arg2;
        response += `
        <tr>
        <td>${operation.arg1}</td>
        <td>${operation.type}</td>
        <td>${operation.arg2}</td>
        <td>${res}</td>
        </tr>
        `;
    });
    response += "</table>";

    res.send(response); // Send a response to the browser
});

// The application is to listen on port number 3000
app.listen(3000, function () {
    console.log('The application is available on port 3000');
});