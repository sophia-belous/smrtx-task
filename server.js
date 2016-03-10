var express = require('express');
var validator = require('express-validator');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var path = require('path');
var multer = require('multer');
var crypto = require('crypto');
var app = express();

var db = require('./config/db');

var port = process.env.PORT || 8080;
mongoose.connect(db.url);

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json', limit: '50mb' }));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true }));
app.use(validator());

app.use(validator({
 customValidators: {
    isPhone: function(value) {
        return /^\+\d{3}\(\d{2}\)\d{3}-\d{2}-\d{2}$/.test(value)
    }
 }
}));

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/uploads');
    },
    filename: function(req, file, cb) {
        crypto.pseudoRandomBytes(5, function (err, raw) {
            if (err) return cb(err);

        cb(null, raw.toString('hex') + path.extname(file.originalname));
        });
    }
});

app.use(multer({    
    storage: storage
}).single('file'));

app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(__dirname + '/public')); 

require('./app/routes')(app);

app.listen(port);         
console.log('Task starts on port ' + port);  

exports = module.exports = app;

