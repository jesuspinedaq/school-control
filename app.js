//packages
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var config = require('./_config');

//routes
var index = require('./routes/index');
var students = require('./routes/students');
var app = express();
//mongodb
mongoose.connect(config.mongoURI[app.settings.env], function(err, res) {
    if(err) {
      console.log('Error connecting to the database. ' + err);
    } else {
      console.log('Connected to Database!');
    }
  });

var port = process.env.PORT || 5000;
if(app.settings.env == 'test')
port = 5001;


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

module.exports = app;