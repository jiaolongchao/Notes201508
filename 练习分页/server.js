/*
var a = 'hello world!';
console.log(a);
this.location = 'location';
console.log(this.location);
var b = function()
{
	console.log('log');

}
b();
*/


var http = require("http"); 
http.createServer(function(request, response) 
{ 
	response.writeHead(200, {"Content-Type": "text/plain"}); 
	//response.write("testuuuuuuuuuuuuuuuuuuuuuuuuuuuodjs");
	response.end(); 
}).listen(8899); 
console.log("nodejs start listen 8899 port!");

/*
var sum = 0;
for(var i=0;i<=100;i++){
   sum +=i
}
console.log(sum)*/
