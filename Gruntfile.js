module.exports = function(grunt) {
    
    grunt.loadNpmTasks('grunt-wiredep');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        concat: {
            dist: {
                src: [
                    'public/js/app.js',                    
                    'public/js/appConfig.js',
                    'public/js/common/commonModule.js',
                    'public/js/orders/orderModule.js',
                    'public/js/customers/customerModule.js',
                    'public/js/common/services/configuredRestangular.js',
                    'public/js/customers/services/customerSrvc.js',      
                    'public/js/orders/services/orderSrvc.js',
                    'public/js/common/filters/daysAgoFilter.js',
                    'public/js/orders/directives/wmOrder.js',
                    'public/js/customers/directives/wmCustomer.js',
                    'public/js/customers/directives/wmCustomername.js',
                    'public/js/orders/controllers/orderCtrl.js',
                    'public/js/orders/controllers/orderAddCtrl.js',
                    'public/js/orders/controllers/orderEditCtrl.js',
                    'public/js/customers/controllers/customerCtrl.js',
                    'public/js/customers/controllers/customerAddCtrl.js',
                    'public/js/customers/controllers/customerEditCtrl.js'                                
                ],
                dest: 'public/js/build/production.js',
            }
        },
        ngAnnotate: {
            app: {
                files: {
                    'public/js/build/production.js': ['public/js/build/production.js']
                }
            }
        },
        uglify: {
            build: {
                src: 'public/js/build/production.js',
                dest: 'public/js/build/production.min.js'
            }
        },
        wiredep: {
            task : {
                src: ['public/views/index.html'],
                exclude: [/animate.css/, /angular-material-icons.css/]
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-ng-annotate');    
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('default', ['wiredep', 'concat', 'ngAnnotate', 'uglify']);

};	