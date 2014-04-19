module.exports = function (grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    version: '<%= pkg.version %>',

    jshint: {
      javascripts: {
        src: ['src/**/*.js']
      }
    },

    browserify: {
      options: {
        transform: ['browserify-shim']
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
          keepalive: true,
          base: 'dist'
        }
      }
    },

    clean: {
      dist: ['dist']
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

    concurrent: {
      options: {
        logConcurrentOutput: true
      },

      watchers: [
        'watch',
        'browserify:watch',
        'connect'
      ]
    },

    watch: {
      options: {
        livereload: true
      },

      javascripts: {
        files: 'src/**/*.js',
        tasks: ['jshint']
      },

      views: {
        files: 'src/**/*.html',
        tasks: ['copy:html']
      },

      stylesheets: {
        files: 'src/**/*.less',
        tasks: ['less', 'autoprefixer']
      }
    }
  });

  grunt.registerTask('build', [
    'test',
    'clean:dist',
    'copy:views',
    'less',
    'autoprefixer',
    'browserify:dist'
  ]);

  grunt.registerTask('test', [
    'jshint'
  ]);

  grunt.registerTask('serve', [
    'concurrent'
  ]);

  grunt.registerTask('default', [
    'build',
    'serve'
  ]);

};
