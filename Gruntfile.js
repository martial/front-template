/* jshint node: true */

module.exports = function (grunt) {
    "use strict";

    grunt.initConfig({

        pkg         : grunt.file.readJSON('package.json'),
        bootstrapdir: 'bootstrap-3.0.0',

        clean: {
            dist: ['dist']
        },

        shell: {
            btsrap: {
                options: {
                    stdout: true
                },
                command: [
                    'cd <%= bootstrapdir %>',
                    'grunt dist',
                    'cd ..'
                ].join('&&')
            }
        },

        concat: {
            options: {
                stripBanners: false
            },
            libs   : {
                src : ['js/libs/*.js'],
                dest: 'public/js/libs.js'
            }
        },

        uglify: {

            libs: {
                src : ['<%= concat.libs.dest %>'],
                dest: 'public/js/libs.min.js'
            },

            index: {
                src : ['js/site/index.js'],
                dest: 'public/js/index.min.js'
            }

        },

        recess: {
            options  : {
                compile: true,
                compress:true
            },
            bootstrap: {
                src : ['less/main.less'],
                dest: 'public/css/<%= pkg.name %>.css'
            },
            min      : {
                options: {
                    compress: true
                },
                src    : ['less/main.less'],
                dest   : 'public/css/<%= pkg.name %>.min.css'
            }

        },

        watch: {
            options : {
                //livereload: true
            },
            bootstrap  : {
                files: '<%= bootstrapdir %>/less/*.less',
                tasks: ['dist']
            },
            less  : {
                files: 'less/*.less',
                tasks: ['dist-css']
            },
            js    : {
                files: 'js/site/*.js',
                tasks: ['dist-js']
            },
            jslibs: {
                files: 'js/libs/*.js',
                tasks: ['dist-js']
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-recess');
    grunt.loadNpmTasks('browserstack-runner');
    grunt.loadNpmTasks('grunt-shell');

    grunt.registerTask('dist-js', ['concat', 'uglify']);
    grunt.registerTask('dist-css', ['recess']);
    grunt.registerTask('dist-site', ['concat', 'uglify', 'dist-css']);

    grunt.registerTask('dist', ['clean', 'dist-css', 'dist-js', 'shell:btsrap']);

    grunt.registerTask('default', ['dist']);

};