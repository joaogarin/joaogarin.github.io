/*jslint node: true */
"use strict";


module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        bower: {
            install: {
                options: {
                    install: true,
                    copy: false,
                    targetDir: './libs',
                    cleanTargetDir: true
                }
            }
        },
        //Enable this for ruby sass compiler
        /*sass: {
         dist: {
         files: {
         'styles/styles.css': 'styles/styles.scss'
         }
         }
         },*/

        //Enable this for libsass compiler
        sass: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    'styles/main.css': 'styles/main.scss'
                }
            }
        },

        copy: {
            main: {
                files: [{
                    //for jquery files
                    expand: true,
                    dot: true,
                    cwd: 'bower_components/jquery/dist',
                    src: ['jquery.min.js', 'jquery.min.map'],
                    dest: 'dist/js'
                },
                {
                    //for font-awesome
                    expand: true,
                    dot: true,
                    cwd: 'bower_components/fontawesome',
                    src: ['fonts/*'],
                    dest: 'dist'
                }]
            }
        },

        uglify: {
            dist: {
                files: {
                    'dist/js/app.js': [ 'dist/js/app.js' ]
                },
                options: {
                    mangle: false,
                    preserveComments: 'some'
                }
            }
        },
        cssmin: {
            combine: {
                files: {
                    'dist/css/main.css': ['bower_components/fontawesome/css/font-awesome.min.css', 'styles/main.css', 'styles/vendor/animate.css']
                }
            },
            add_banner: {
                options: {
                    banner: '/* My minified admin css file */'
                },
                files: {
                    'dist/css/main.css': ['dist/css/main.css']
                }
            }
        },

        html2js: {
            dist: {
                src: [ 'app/views/*.html','app/views/charts/*.html','app/views/forms/*.html','app/views/mail/*.html','app/views/maps/*.html','app/views/pages/*.html','app/views/tables/*.html','app/views/tables/*.html','app/views/tasks/*.html','app/views/ui_elements/*.html' ],
                dest: 'tmp/views.js'
            }
        },

        clean: {
            temp: {
                src: [ 'tmp' ]
            }
        },

        concat: {
            options: {
                separator: ';',
                stripBanners : true,
            },
            dist: {
                src: ['bower_components/angular/angular.min.js',
                    'bower_components/angular-animate/angular-animate.min.js',
                    'bower_components/angular-sanitize/angular-sanitize.min.js',
                    'bower_components/angular-disqus/angular-disqus.min.js',
                    'bower_components/angular-route/angular-route.min.js',
                    'bower_components/underscore/underscore-min.js',
                    'scripts/vendor/modernizr.custom.js',
                    'scripts/vendor/classie.js',
                    'scripts/vendor/slideshowMockup.js',
                    'app/*.js' ],
                dest: 'dist/js/app.js'
            }
        },

        jshint: {
            all: [ 'Gruntfile.js', 'app/*.js', 'app/**/*.js' ]
        },

        connect: {
            server: {
                options: {
                    hostname: 'localhost',
                    port: 8888
                }
            }
        },

        watch: {
            dev: {
                files: [ 'Gruntfile.js', 'app/*.js', '*.html','styles/*.*','styles/_*.scss' ],
                tasks: [ 'jshint','html2js:dist', 'copy:main','sass', 'concat:dist', 'clean:temp','cssmin' ],
                options: {
                    atBegin: true
                }
            },
            min: {
                files: [ 'Gruntfile.js', 'app/*.js', '*.html','styles/*.*','styles/_*.scss' ],
                tasks: [ 'jshint','html2js:dist','copy:main','sass', 'concat:dist', 'clean:temp', 'uglify:dist','cssmin' ],
                options: {
                    atBegin: true
                }
            }
        },

        compress: {
            dist: {
                options: {
                    archive: 'dist/<%= pkg.name %>-<%= pkg.version %>.zip'
                },
                files: [{
                    src: [ 'index.html' ],
                    dest: '/'
                }, {
                    src: [ 'app/**' ],
                    dest: 'app/'
                }, {
                    src: [ 'app/**' ],
                    dest: 'app/'
                }, {
                    src: [ 'app/**' ],
                    dest: 'app/'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-sass');
    //This uses Libsass
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-bower-task');

    grunt.registerTask('dev', [ 'bower', 'connect:server', 'watch:dev' ]);
    grunt.registerTask('test', [ 'bower', 'jshint' ]);
    grunt.registerTask('minified', [ 'bower', 'connect:server', 'watch:min' ]);
};