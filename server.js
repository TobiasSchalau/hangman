var express = require('express');
const fs = require('fs');
const meta_file = './contracts/artifacts/hangman_metadata.json';

var app = express();
app.use(express.static(__dirname));

app.get('/meta', function(req, res){
    fs.readFile(meta_file, 'utf8', (err,data)=>{
        if(err){
            console.log(err);
            return;
        }
        console.log(data);
        res.json(data);
    });
});

app.listen('3300');
console.log('Running at\nhttp://localhost:3300');
