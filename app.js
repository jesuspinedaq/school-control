//packages
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
//routes
var index = require('./routes/index');
var students = require('./routes/students');

//mongodb
mongoose.connect('mongodb://localhost/ces');

var app = express();
var port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



//app.use('/', index.index);
app.get('/', function(req, res){
    res.send('hello world');
});

//student routes
app.get('/students', students.index);
app.post('/students', students.create);
app.get('/students/:id', students.show);
app.delete('/students/:id', students.delete);
app.put('/students/:id', students.update);



app.listen(port, function(err){
    console.log('running server in port' + port);
})