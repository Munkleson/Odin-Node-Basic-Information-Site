const url = require('url');
const http = require('http');
const fs = require('fs');
let PORT = 8080;

http.createServer(function (req, res) {
    const q = url.parse(req.url, true);
    let filename = "." + q.pathname;
    if (filename.length === 2){
        filename += "index.html";
    }
    if (!filename.includes(".html")){
        filename += ".html";
    }
    fs.readFile(filename, function (err, data) {
        if (err) {
            fs.readFile('./404.html', (error404, content404) => {
            res.writeHead(404, {"Content-Type" : 'text/html'});
            res.end(content404, 'utf-8');
        });
        } else {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            return res.end();
        }
    });
}).listen(PORT);