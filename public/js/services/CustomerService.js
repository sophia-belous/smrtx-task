(function() {
    'use strict';
    angular.module('CustomerService', [])
        .factory('CustomerRestangular', CustomerRestangular)
        .factory('Customer', Customer);
        
        function CustomerRestangular(Restangular) {
            return Restangular.withConfig(function(RestangularConfigurer) {
                RestangularConfigurer.setRestangularFields({
                    id: '_id'
                });
            });
        }
    
        function Customer(CustomerRestangular) {        
            var Customer = CustomerRestangular.all('customers');
            
            return {
                getOne: getOne,
                getAll: getAll,
                getOrders: getOrders,
                add: add,
                update: update,
                remove: remove
            };
            
            function getOne(customerName, callback) {
                return CustomerRestangular.one('customers', customerName).then(callback);
            }
            
            function getAll(callback) {
                return Customer.getList().then(callback);
            }
            
            function getOrders(customerName, callback) {
                return CustomerRestangular.one('customers', customerName).all('orders').getList().then(callback);
            }
            
            function add(callback) {
                var newCustomer = {
                    name: 'Fanta',
                    email: 'fanta@mail.com',
                    logo: 'logo'
                } 
                return Customer.post(newCustomer).then(callback);              
            }
        
            function update(customerName, customerData, callback) {
                return CustomerRestangular.one('customers', customerName).save().then(callback);
            }
            
            function remove(customerName) {
                return CustomerRestangular.one('customers', customerName).remove();
            }
        
        
    };    
})();