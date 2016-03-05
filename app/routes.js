var path = require('path');
var Customer = require('./models/customer');
var Order = require('./models/order');
var mongoose = require('mongoose');
var mongodb = mongoose.connection;
var fs = require('fs');

module.exports = function(app) {
    app.get('/api/customers', function(req, res) {
        Customer.find(function(err, customers) {
            if (err) res.send(err);
            
            res.json(customers);
        });
    });
    
    app.post('/api/customers', function(req, res) {
        /*var customer = new Customer({
            name: req.body.name,
            logo: req.body.logo,
            email: req.body
        });
        
        customer.save(function(err) {
            if (err) return err;
            
            var order = new Order({
                _customerid: customer._id,
                description: req.body.order[0].description,
                price: req.body.order[0].price,
            });
        });*/
        
        var customer = new Customer({
            name: 'nameFirst',
            logo: 'req.body.logo',
            email: 'req.body.email'
        });
        
        customer.save(function(err) {
            if (err) return err;
            
            var order = new Order({
                _customerid: customer._id,
                description: 'req.body.order[0].description',
                price: 1
            });
            
            order.save(function(err) {
                if (err) return err;
            });
                
            customer.orders.push(order);
            customer.save();
            
            res.json({message: 'Customer created'});
        });
    });
    
    app.get('/api/customers/:customer_name', function(req, res) {
        Customer.findOne({name: req.params.customer_name})
                .populate('orders')
                .exec(function(err, customer) {
                    if (err) return err;
                    
                    res.json(customer);
                }); 
    });
    
    app.put('/api/customers/:customer_name', function(req, res) {
        Customer.findOne({name: req.params.customer_name}, function(err, customer) {
            if (err) res.send(err);
            
            customer.name = req.body.name;
            customer.logo = req.body.logo;
            customer.email = req.body.email;
            
            customer.save(function(err) {
                if (err) return err;
                
                res.json({message: 'Customer Updated'})
            });
        });
	});
    
    app.delete('/api/customers/:customer_name', function(req, res) {
		Customer.remove({name: req.params.customer_name}, function(err, animal) {
			if(err)	res.send(err);
			
			res.json({message: 'Successfully Deleted'})
		});
	});
    
    app.get('*', function(req, res) {
        res.sendFile('index.html', { root: path.join(__dirname, '../public/views/')});
    });
};