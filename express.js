var express = require('express')
var app = express()
var data = require('./data');// import data from "./data"
var getRandomName = require('./util');//import getRandomName function from './util'

app.get('/', function (req, res) {
    res.send('hello world')
})

app.get("/user/random_user",function(req,res){
    const payload = getRandomName(data, req.query.size);

    payload.sort((a, b)=>{
        return req.query.order === 'asc' ? a.first_name.localeCompare(b.first_name) : b.first_name.localeCompare(a.first_name)
    })

    let payloadStr=JSON.stringify(payload);
    res.send(payloadStr);
    
})

app.listen(8080)