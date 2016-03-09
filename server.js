var express = require('express');
var validator = require('express-validator');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var app = express();

var db = require('./config/db');

var port = process.env.PORT || 8080;
mongoose.connect(db.url);

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(validator());

app.use(validator({
 customValidators: {
    isPhone: function(value) {
        return /^\+\d{3}\(\d{2}\)\d{3}-\d{2}-\d{2}$/.test(value)
    }
 }
}));

app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(__dirname + '/public')); 

require('./app/routes')(app);

app.listen(port);         
console.log('Task starts on port ' + port);  

exports = module.exports = app;

