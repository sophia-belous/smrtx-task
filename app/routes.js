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
        var customer = new Customer({
            name: req.body.name,
            logo: req.body.logo,
            email: req.body.email
        });
        
        customer.save(function(err) {
            if (err) res.send(err);

            res.json({message: 'Customer created'});
        });
    });
    
    app.get('/api/customers/:customer_name', function(req, res) {
        Customer.findOne({name: req.params.customer_name}, function(err, customer) {
            if (err) res.send(err);
            
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
		Customer.remove({name: req.params.customer_name}, function(err, customer) {
			if(err)	res.send(err);
			
			res.json({message: 'Successfully Deleted'})
		});
	});
    
     app.get('/api/customers/:customer_name/orders', function(req, res) {
        Order.find({_customername: req.params.customer_name}, function(err, orders) {
            if (err) res.send(err);
            
            res.json(orders);
        });
    });
    
    app.post('/api/customers/:customer_name/orders', function(req, res) {
       Customer.findOne({name: req.params.customer_name}, function(err, customer) {
           if (err) res.send(err);
              
            var order = new Order({
                _customername: customer.name,
                description: req.body.description,
                price: req.body.price
            });
            
            order.save(function(err) {
                if (err) res.send(err);
                
                res.json({message: 'Order created'});
            });
            
            customer.orders.push(order);
            customer.save();
       });
    });
    
    app.put('/api/customers/:customer_name/orders/:order_id', function(req, res) {
        Order.findOne({_id: req.params.order_id, _customername: req.params.customer_name}, function(err, order) {
            if (err) res.send(err);

            order.description = req.body.description;
            order.price = req.body.price;
            
            order.save(function(err) {
                if (err) res.send(err);
                
                res.json({message: 'Order Updated'});
            });
        });             
    });
    
    app.delete('/api/customers/:customer_name/orders/:order_id', function(req, res) {
		Order.remove({_id: req.params.order_id, _customername: req.params.customer_name}, function(err, order) {
			if(err)	res.send(err);
			
			res.json({message: 'Successfully Deleted'})
		});
	});
    
    app.get('*', function(req, res) {
        res.sendFile('index.html', { root: path.join(__dirname, '../public/views/')});
    });
};