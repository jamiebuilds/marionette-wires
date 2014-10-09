var logger = require('morgan');
var api = require('./api/api.js');

module.exports = function (grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    version: '<%= pkg.version %>',

    env: {
      dist: {
        BROWSERIFYSWAP_ENV: 'dist'
      }
    },

    jshint: {
      javascripts: {
        src: ['src/**/*.js']
      },

      tests: {
        options: {
          jshintrc: 'test/.jshintrc'
        },

        src: ['test/**/*.js']
      }
    },

    browserify: {
      options: {
        bundleOptions: {
          debug: true
        }
      },

      dist: {
        files: {
          'dist/bundle.js': ['./src/main.js']
        }
      },

      watch: {
        options: {
          keepAlive: true,
          watch: true
        },

        files: {
          'dist/bundle.js': ['./src/main.js']
        }
      }
    },

    connect: {
      server: {
        options: {
          port: 9000,
          base: 'dist',
          middleware: function (connect, options, middlewares) {
            middlewares.unshift(api);

            if (this.flags.keepalive) {
              middlewares.unshift(logger('dev'));
            }

            return middlewares;
          }
        }
      }
    },

    clean: {
      dist: ['dist']
    },

    symlink: {
      src: {
        src: 'src',
        dest: 'node_modules/src'
      }
    },

    copy: {
      views: {
        expand: true,
        cwd: 'src/',
        src: '**/*.html',
        dest: 'dist/',
        filter: 'isFile'
      }
    },

    less: {
      dist: {
        src: 'src/main.less',
        dest: 'dist/bundle.css'
      }
    },

    autoprefixer: {
      dist: {
        src: 'dist/bundle.css',
        dest: 'dist/bundle.css'
      }
    },

    mochaTest: {
      tests: {
        options: {
          require: 'test/setup/node.js',
          reporter: 'dot',
          clearRequireCache: true,
          mocha: require('mocha')
        },
        src: [
          'test/setup/helpers.js',
          'test/unit/**/*.spec.js'
        ]
      }
    },

    pioneer: {
      options: {
        features : 'test/integration/features',
        steps    : 'test/integration/steps',
        widgets  : 'test/integration/widgets',
        format   : 'pretty'
      }
    },

    concurrent: {
      options: {
        logConcurrentOutput: true
      },

      watchers: [
        'watch',
        'browserify:watch',
        'connect:server:keepalive'
      ]
    },

    watch: {
      options: {
        livereload: true,
        spawn: false
      },

      javascripts: {
        files: ['src/**/*.js', 'src/**/*.hbs'],
        tasks: ['jshint:javascripts', 'mochaTest']
      },

      views: {
        files: 'src/**/*.html',
        tasks: ['copy:views']
      },

      stylesheets: {
        files: 'src/**/*.less',
        tasks: ['less', 'autoprefixer']
      },

      tests: {
        files: 'test/unit/**/*.spec.js',
        tasks: ['jshint:tests', 'mochaTest']
      }
    }
  });

  grunt.registerTask('build', [
    'env:dist',
    'symlink',
    'clean:dist',
    'copy:views',
    'less',
    'autoprefixer',
    'browserify:dist',
    'test'
  ]);

  grunt.registerTask('test', [
    'symlink',
    'jshint',
    'mochaTest'
  ]);

  grunt.registerTask('test:integration', [
    'connect',
    'pioneer'
  ]);

  grunt.registerTask('serve', [
    'concurrent:watchers'
  ]);

  grunt.registerTask('default', [
    'build',
    'serve'
  ]);

  require('./tasks/events')(grunt);

};
