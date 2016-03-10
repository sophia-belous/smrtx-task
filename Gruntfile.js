module.exports = function(grunt) {
    
    grunt.loadNpmTasks('grunt-wiredep');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        concat: {
            dist: {
                src: [
                    'public/js/controllers/MainCtrl.js',
                    'public/js/controllers/CustomerCtrl.js',
                    'public/js/controllers/OrderCtrl.js',
                    'public/js/services/CustomerSrvc.js',
                    'public/js/appFilters.js',
                    'public/js/appDirectives.js',
                    'public/js/appRoutes.js',
                    'public/js/app.js',
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