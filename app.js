//packages
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var config = require('./_config');

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

app.get('/', function(req, res){
    res.send('hello world');
});

var Student = require('./model/student');
var studentRouter = require('./routes/students')(Student);
app.use('/students', studentRouter); 

app.listen(port, function(err){
    console.log('running server in port' + port);
})

module.exports = app;