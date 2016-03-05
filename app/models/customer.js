var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Order = require('./order');
var customerSchema = new Schema({ name: String,
                                  logo: String,
                                  email: String,
                                  orders: [{
                                      type: Schema.ObjectId,
                                      ref: 'Order'
                                  }]
                                });

module.exports = mongoose.model('Customer', customerSchema);