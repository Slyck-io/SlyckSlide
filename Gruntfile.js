module.exports = function(grunt) {
    grunt.initConfig({
        uglify: {
            options: {
                mangle: true
            },
            slyckSlide: {
                files: {
                    'dist/slyckSlide.min.js': ['src/js/slyckSlide.js'],
                }
            }
        },
        less: {
            development: {
                options: {
                    paths: ['src/less']
                },
                files: {
                    'dist/slyckSlide.css': 'src/less/slyckSlide.less'
                }
            },
            production: {
                options: {
                    paths: ['src/less'],
                },
                files: {
                    'dist/slyckSlide.css': 'src/less/slyckSlide.less'
                }
            }
        },
        autoprefixer: {
            options: {
                //Browsers to prefix for
                browsers: ['last 2 version', 'ie 8', 'ie 9', 'Opera 12.1']
            },
            dist: {
                files: {
                    'dist/slyckSlide.css': 'dist/slyckSlide.css' // destination file and source file
                }
            }
        },
        watch: {
            scripts: {
                files: ['**/*.js'],
                tasks: ['less:development'],
                options: {
                    spawn: false,
                },
            },
        },
        cssmin: {
            compress: {
                files: {
                    'dist/slyckSlide.min.css': ['dist/slyckSlide.css']
                }
            }
        },
        copy: {
            main: {
                expand: true,
                cwd: 'src/js',
                src: '**',
                dest: 'dist/',
            },
        },
        bump: {
            options: {
                files: ['package.json'],
                updateConfigs: [],
                commit: false,
                createTag: true,
                tagName: 'v%VERSION%',
                tagMessage: 'Version %VERSION%',
                push: true,
                pushTo: 'origin',
                gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
                globalReplace: false,
                prereleaseName: "pre",
                metadata: '',
                regExp: false
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-bump');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');

    //grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);
    grunt.registerTask('build', ['uglify', 'less:production', 'autoprefixer', 'cssmin', 'copy']);
}
