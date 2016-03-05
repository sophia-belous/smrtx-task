var path = require('path');
var Customer = require('./models/customer');

module.exports = function(app) {
    app.get('/api/customers', function(req, res) {
        Customer.find(function(err, customers) {
            if (err) res.send(err);
            
            res.json(customers);
        });
    });
    
    app.get('*', function(req, res) {
        res.sendFile('index.html', { root: path.join(__dirname, '../public/views/')});
    });
};