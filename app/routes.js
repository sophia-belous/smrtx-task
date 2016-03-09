var path = require('path');
var util = require('util');
var Customer = require('./models/customer');
var Order = require('./models/order');
var mongoose = require('mongoose');
var mongodb = mongoose.connection;

module.exports = function(app) {
    
    var customerBody = {
        'name': { notEmpty: true },
        'email': {
            notEmpty: true,
            isEmail: { errorMessage: 'Enter a valid email address.' }
        },
        'phone': {
            notEmpty: true,
            isPhone: { errorMessage: 'Enter a valid phone number.' }
        }
    };
    var orderBody = {
        'description': {
            notEmpty: true,
            isLength: {
                options: [{ max: 150 }],
                errorMessage: 'Must be less then 150 chars long'
            },
            errorMessage: 'This is required.'
        },
        'price': {
            notEmpty: true,
            isNumeric: { errorMessage: 'Enter a price number.' }
        }
    };
    
    app.get('/api/customers', function(req, res) {
        Customer.find(function(err, customers) {
            if (err) res.send(err);
            
            res.json(customers);
        });
    });
    
    app.post('/api/customers', function(req, res) {
        req.checkBody(customerBody);
        
        var errors = req.validationErrors();
        if (errors) {
            res.status(400).send(util.inspect(errors))
            return;
        }
        var customer = new Customer({
            name: req.body.name,
            logo: req.body.logo,
            email: req.body.email,
            phone: req.body.phone
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
        req.checkBody(customerBody);
        
        var errors = req.validationErrors();
        if (errors) {
            res.status(400).send(util.inspect(errors))
            return;
        }
        Customer.findOne({name: req.params.customer_name}, function(err, customer) {
            if (err) res.send(err);
            
            Order.find({_customername: req.params.customer_name}, function(err, orders) {
                if (err) res.send(err);

                for (var key in orders) {
                    if (orders.hasOwnProperty(key)) {
                        orders[key]._customername = req.body.name;                        
                        orders[key].save();                        
                    }
                }
            });
            
            customer.name = req.body.name;
            customer.email = req.body.email;
            customer.phone = req.body.phone;
            
            customer.save(function(err) {
                if (err) return err;
                
                res.json({message: 'Customer Updated'})
            });
        });
	});
    
    app.delete('/api/customers/:customer_name', function(req, res) {
		Customer.remove({name: req.params.customer_name}, function(err, customer) {
			if(err)	res.send(err);
            
            Order.remove({_customername: req.params.customer_name}, function(err, order) {
                if(err)	res.send(err);			
            });
			
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
        req.checkBody(orderBody);

        var errors = req.validationErrors();
        if (errors) {
            res.status(400).send(util.inspect(errors))
            return;
        }
       Customer.findOne({name: req.params.customer_name}, function(err, customer) {
           if (err) res.send(err);
              
            var order = new Order({
                _customername: customer.name,
                description: req.body.description,
                price: req.body.price,
                date: Date.now()
            });
            
            order.save(function(err) {
                if (err) res.send(err);
                
                res.json({message: 'Order created'});
            });
       });
    });
    
      app.get('/api/customers/:customer_name/orders/:order_id', function(req, res) {
        Order.findOne({_id: req.params.order_id, _customername: req.params.customer_name}, function(err, order) {
            if (err) res.send(err);
            
            res.json(order);
        });                
    });
    
    
    app.put('/api/customers/:customer_name/orders/:order_id', function(req, res) {
        req.checkBody(orderBody);

        var errors = req.validationErrors();
        if (errors) {
            res.status(400).send(util.inspect(errors))
            return;
        }
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