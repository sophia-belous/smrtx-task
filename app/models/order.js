var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderSchema = new Schema({ description: String,
                               price: String,
                               date: {type: Date, default: Date.now()}});

module.exports = mongoose.model('Order', orderSchema);