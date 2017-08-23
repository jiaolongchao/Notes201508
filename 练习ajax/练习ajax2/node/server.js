/**
 * Created by 银鹏 on 2016/1/16.
 */
var PORT = 3000;

var http = require('http');
var url=require('url');
var fs=require('fs');
var mine=require('./mime').types;
var path=require('path');
var info = require('./getInfo')

var server = http.createServer(function (request, response) {
    var urlObject = url.parse(request.url).pathname;
    var pathname = urlObject.pathname;
    if(urlObject === '/getInof'){
        info(urlObject.query.type,response);
    }
    //拿到请求资源的后缀名
    var realPath = path.join("../", pathname);
    var ext = path.extname(realPath);
    ext = ext ? ext.slice(1) : 'unknown';
    fs.exists(realPath, function (exists) {
        if (!exists) {
            response.writeHead(404, {
                'Content-Type': 'text/plain'
            });

            response.write("This request URL " + pathname + " was not found on this server.");
            response.end();
        } else {
            fs.readFile(realPath, "binary", function (err, file) {
                if (err) {
                    response.writeHead(500, {
                        'Content-Type': 'text/plain'
                    });
                    response.end(err);
                } else {
                    var contentType = mine[ext] || "text/plain";
                    response.writeHead(200, {
                        'Content-Type': contentType
                    });
                    response.write(file, "binary");
                    response.end();
                }
            });
        }
    });
});
server.listen(PORT);
console.log("Server runing at port: " + PORT + ".");