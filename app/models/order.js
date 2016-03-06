var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Customer = require('./customer');

var orderSchema = new Schema({
                               _customername: { type: String, ref: 'Customer'},
                               description: String,
                               price: Number,
                               date: {type: Date, default: Date.now()}
                            });

module.exports = mongoose.model('Order', orderSchema);