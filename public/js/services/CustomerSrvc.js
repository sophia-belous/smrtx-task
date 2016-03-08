(function() {
    'use strict';
    angular.module('CustomerSrvc', [])
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
                add: add,
                update: update,
                remove: remove,
                getOrders: getOrders,
                getOneOrder: getOneOrder,
                addOrder: addOrder,
                updateOrder: updateOrder,
                removeOrder: removeOrder                
            };
            
                function getOne(customerName, callback) {
                return CustomerRestangular.one('customers', customerName).get().then(callback);
            }
            
            function getAll(callback) {
                return Customer.getList().then(callback);
            }
            
            function add(customerData, callback) {
                return Customer.post(customerData).then(callback);
            }
        
            function update(customerName, customerData, callback) {
                return CustomerRestangular.one('customers', customerName).customPUT(customerData).then(callback);
            }
            
            function remove(customerName) {
                return CustomerRestangular.one('customers', customerName).remove();
            }
            
            function getOrders(customerName, callback) {
                return CustomerRestangular.one('customers', customerName).all('orders').getList().then(callback);
            }   
            
            function getOneOrder(customerName, orderId, callback) {
                return CustomerRestangular.one('customers', customerName).one('orders', orderId).get().then(callback);
            }
            
            function addOrder(customerName, orderData, callback) {
                return CustomerRestangular.one('customers', customerName).all('orders').post(orderData).then(callback);
            }
            
            function updateOrder(customerName, orderId, orderData, callback) {
                return CustomerRestangular.one('customers', customerName).all('orders').one(orderId).customPUT(orderData).then(callback);
            }
            
            function removeOrder(customerName, orderId) {
                return CustomerRestangular.one('customers', customerName).all('orders').one(orderId).remove();
            }       
    };    
})();