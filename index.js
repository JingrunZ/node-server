var http = require('http'); // 1 - Import Node.js core module
var data = require('./data');// import data from "./data"
var getRandomName = require('./util');//import getRandomName function from './util'

var server = http.createServer(function (req, res) {   // 2 - creating server

    const {url} = req // const url = req.url
    const [endPoint, queryParam] = url.split('?')
    
    //temp api for check
    const API1 = /^.*\/users\/random_user$/i

    if (req.url == '/') { //check the URL of the current request
        
        // set response header
        res.writeHead(200, { 'Content-Type': 'text/html' }); 
        
        // set response content    
        res.write('<html><body><p>This is home Page.</p></body></html>');
        res.end();
    
    }
    else if (API1.test(endPoint) ) {  
        // https://random-data-api.com/api/users/random_user?order=asec&size=3 
        var size = queryParam.match(/size=([^&]*)/)[1]
        var order = queryParam.match(/order=([^&]*)/)[1]

        const payload = getRandomName(data, size)

        payload.sort((a, b)=>{
            return order === 'asc' ? a.first_name.localeCompare(b.first_name) : b.first_name.localeCompare(a.first_name)
        })
    
        let payloadStr=JSON.stringify(payload);

        res.setHeader("Access-Control-Allow-Origin","*");
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(payloadStr);
        res.end();
    }

    else
        res.end('Invalid Request!');
});

server.listen(5000); //3 - listen for any incoming requests port

console.log('Node.js web server at port 5000 is running..')