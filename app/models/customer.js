var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var customerSchema = new Schema({ name: String,
                                  logo: { data: Buffer, contentType: String, filename: String},
                                  email: String,
                                  phone: String
                                });

module.exports = mongoose.model('Customer', customerSchema);