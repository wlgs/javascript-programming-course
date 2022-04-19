const fs = require('fs');
/**
 * Handles incoming requests.
 *
 * @param {IncomingMessage} request - Input stream — contains data received from the browser, e.g. encoded contents of HTML form fields.
 * @param {ServerResponse} response - Output stream — put in it data that you want to send back to the browser.
 * The answer sent by this stream must consist of two parts: the header and the body.
 * <ul>
 *  <li>The header contains, among others, information about the type (MIME) of data contained in the body.
 *  <li>The body contains the correct data, e.g. a form definition.
 * </ul>
 */
function requestListener(request, response) {
    console.log("--------------------------------------");
    console.log("The relative URL of the current request: " + request.url + "\n");
    var url = new URL(request.url, `http://${request.headers.host}`); // Create the URL object
    if (url.pathname == "/submit") {
        // Processing the form content, if the relative URL is '/submit'
        /* ************************************************** */
        console.log("Creating a response header");
        // Creating an answer header — we inform the browser that the body of the answer will be plain text
        response.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
        /* ************************************************** */
        console.log("Creating a response body");
        if (request.method == "GET") {
            // If the GET method was used to send data to the server
            // Place given data (here: 'Hello <name>') in the body of the answer
            var filename = url.searchParams.get("filename");
            console.log(filename);
            var type = undefined;
            response.write(`Result:\n`);
            try {
                if (fs.lstatSync(filename).isDirectory()) {
                    type = "Directory"
                    var fileListString = ""
                    var files = fs.readdirSync(filename);
                    files.forEach(file => {
                        fileListString += file;
                        fileListString += "\n";
                    });  
                    response.write(
                        `${type}\nFiles in directory:\n${fileListString}`
                    );
                    console.log("Sending the response");
                    response.end(); // The end of the response — send it to the browser

                }
                else {
                    type = "File"
                    fs.readFile(filename, { encoding: 'utf8', flag: 'r' }, (err, data) => {
                        if (err != null) {
                            response.write(
                                `Something went wrong -> ${err}`
                            );
                            console.log("Sending the response");
                            response.end(); // The end of the response — send it to the browser
                        }
                        response.write(
                            `${type}\n${data}`
                        );
                        console.log("Sending the response");
                        response.end(); // The end of the response — send it to the browser
                    })
                }
            } catch (err) {
                console.log("Encountered an error -> ", err);
                response.write(
                    `Something went wrong -> ${err}`
                );
                response.end(); // The end of the response — send it to the browser
            }
        }
        else
            response.write(
                `This application does not support the ${request.method} method`
            );
        /* ************************************************** */

    } else {
        // Generating the form
        /* ************************************************** */
        console.log("Creating a response header");
        // Creating a response header — we inform the browser that the body of the response will be HTML text
        response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        /* ************************************************** */
        console.log("Creating a response body");
        // and now we put an HTML form in the body of the answer
        response.write(`<form method="GET" action="/submit">
                                <label for="filename">Please enter filename</label>
                                <input name="filename">
                                <br>
                                <input type="submit">
                                <input type="reset">
                            </form>`);
        /* ************************************************** */
        console.log("Sending the response");
        response.end(); // The end of the response — send it to the browser
    }
}

/* ************************************************** */
/* Main block
    /* ************************************************** */
var http = require("http");

var server = http.createServer(requestListener); // The 'requestListener' function is defined above
server.listen(3000);
console.log("The server was started on port 3000");
console.log("To stop the server, press 'CTRL + C'");
