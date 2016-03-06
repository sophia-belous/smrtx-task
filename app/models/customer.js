var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var customerSchema = new Schema({ name: String,
                                  logo: String,
                                  email: String
                                });

module.exports = mongoose.model('Customer', customerSchema);