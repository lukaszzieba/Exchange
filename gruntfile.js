module.exports = function(grunt) {

    // Config tasts
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        ngAnnotate: {
            options: {
                singleQuotes: true
            },
            app: {
                files: {
                    'client/dist/min-safe/appModule.js': ['client/app/*.module.js', 'client/app/*.config.js'],
                    'client/dist/min-safe/dependencyModules.js': ['client/app/**/*.module.js', 'client/app/**/*.config.js', 'client/app/**/*.js']
                }
            }
        },
        concat: {
            js: { //target
                src: ['client/dist/min-safe/appModule.js', 'client/dist/min-safe/dependencyModules.js'],
                dest: 'client/dist/min-safe/app.js'
            }
        },
        uglify: {
            options: {
                beautify: false,
                mangle: false,
                except: ['jQuery', 'angular']
            },
            build: {
                src: ['client/dist/min-safe/app.js'],
                dest: 'client/dist/app.min.js'
            }
        }
    });

    // Load the plugins
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-ng-annotate');


    // Register tasks
    grunt.registerTask('default', ['ngAnnotate', 'concat', 'uglify:build']);

};
