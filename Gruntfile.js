var logger = require('morgan');
var bodyParser = require('body-parser');
var mockApi = require('./mock-api');

module.exports = function (grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    version: '<%= pkg.version %>',

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
            if (this.flags.keepalive) {
              middlewares.unshift(logger('dev'));
            }
            middlewares.unshift(bodyParser.json());
            middlewares.push(mockApi);
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
      },
      lib: {
        src: 'lib',
        dest: 'node_modules/lib'
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

    run: {
      pioneer: {
        cmd: 'npm',
        args: [
          'run',
          'integration'
        ]
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
    'mochaTest',
    'connect',
    'run:pioneer'
  ]);

  grunt.registerTask('test-travis', [
    'symlink',
    'jshint',
    'mochaTest',
    'run:pioneer'
  ]);

  grunt.registerTask('test:integration', [
    'connect',
    'run:pioneer'
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
