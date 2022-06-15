
var fs = require("fs");
const file = 'form2.html';

function onRequest_8080(request, response) {
    fs.stat(file, function (err, stats) {
        if (err == null) { // If the file exists
          fs.readFile(file, function (err, data) { // Read it content
            response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
            response.write(data);   // Send the content to the web browser
            response.end();
          });
        }
        else { // If the file does not exists
          response.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
          response.write(`The '${file}'file does not exist`);
          response.end();
        } //else
      }); //fs.stat
  }
  
  function onRequest_8081(request, response) {
    const curDate = new Date();
    const xmlResponse = `
    <div>
        <span id='date'> ${curDate.toDateString()} </span>
        <span id='time'> ${curDate.toTimeString()} </span>
    </div>
    `
    response.writeHead(200, { "Content-Type": "text/xml" });
    response.write(xmlResponse);
    response.end();
  }
  
  /* ************************************************** */
  /* Main block
  /* ************************************************** */
  var http = require('http');
  
  http.createServer(onRequest_8080).listen(4040);
  http.createServer(onRequest_8081).listen(4041);
  console.log("The server was started on port 4040, 4041");
  console.log("To stop the server, press 'CTRL + C'");