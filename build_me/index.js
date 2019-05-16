const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

// Get secret from config
const secret = require('./src/config.js');

// you can pass the parameter in the command line. e.g. node static_server.js 3000
const port = process.argv[2] || 3000;

// maps file extention to MIME types
const mimeType = {
  '.ico': 'image/x-icon',
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.wav': 'audio/wav',
  '.mp3': 'audio/mpeg',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  '.doc': 'application/msword',
  '.eot': 'appliaction/vnd.ms-fontobject',
  '.ttf': 'aplication/font-sfnt'
};

http.createServer(function (req, res) {
    console.log(`${req.method} ${req.url}`);

    // parse URL
    const parsedUrl = url.parse(req.url);

    // extract URL path
    // by limiting the path to current directory only
    const sanitizePath = path.normalize(parsedUrl.pathname).replace(/^(\.\.[\/\\])+/, '');
    let pathname = path.join(__dirname, sanitizePath);
    const isConfig = !pathname.includes("config")

    fs.exists(pathname, function (exist) {
        if (!exist && isConfig) {
            // if the file is not found, return 404
            res.statusCode = 404;
            res.end(`File ${pathname} not found!`);
            return;
        }

        // if is a directory, then look for index.html
        if (isConfig) {
            if (fs.statSync(pathname).isDirectory()) {
                if (typeof secret !== 'undefined' && secret !== null) {
                    pathname += '/secret.html';
                } else {
                    pathname += '/index.html';
                }
            }
        }


        // read file from file system
        fs.readFile(pathname, function(err, data){
            if(err && isConfig){
                res.statusCode = 500;
                res.end(`Error getting the file: ${err}.`);
            } else if (pathname.includes("config")) {
                res.setHeader('Content-type', 'application/json');
                res.end( JSON.stringify(secret));
            }
            else {
                // based on the URL path, extract the file extention. e.g. .js, .jpg
                const ext = path.parse(pathname).ext;

                // if the file is found, set Content-type and send data
                res.setHeader('Content-type', mimeType[ext] || 'text/plain' );
                res.end(data);
            }
        });
    });
}).listen(parseInt(port));

console.log(`Server listening on port ${port}`);
