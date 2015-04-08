var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserify = require('browserify');
var del = require('del');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var stylish = require('jshint-stylish');
var buffer = require('vinyl-buffer');
var _ = require('lodash');

var browserSync = require('browser-sync');
var reload = browserSync.reload;

var api = require('./api/api');

gulp.task('clean', function(cb) {
  del([
    'app/tmp'
  ], cb);
});

gulp.task('html', function() {
  return gulp.src('./src/index.html')
    .pipe($.plumber())
    .pipe(gulp.dest('./dist'));
});

gulp.task('styles', function() {
  return gulp.src('./src/main.less')
    .pipe($.less())
    .pipe($.autoprefixer())
    .pipe($.rename('bundle.css'))
    .pipe(gulp.dest('./dist'))
    .pipe(reload({ stream: true }));
});

var bundler = _.memoize(function(watch) {
  var options = {debug: true};

  if (watch) {
    _.extend(options, watchify.args);
  }

  var b = browserify('./src/main.js', options);

  if (watch) {
    b = watchify(b);
  }

  return b;
});

var handleErrors = function() {
  var args = Array.prototype.slice.call(arguments);
  delete args[0].stream;
  $.util.log.apply(null, args);
  this.emit('end');
};

function bundle(cb, watch) {
  return bundler(watch).bundle()
    .on('error', handleErrors)
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe($.sourcemaps.init({ loadMaps: true }))
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest('./dist'))
    .on('end', cb)
    .pipe(reload({ stream: true }));
}

gulp.task('scripts', function(cb) {
  process.env.BROWSERIFYSWAP_ENV = 'dist';
  bundle(cb, true);
});

gulp.task('jshint', function() {
  return gulp.src(['./src/**/*.js', './test/**/*.js'])
    .pipe($.plumber())
    .pipe($.jshint())
    .pipe($.jshint.reporter(stylish));
});

var reporter = 'spec';

gulp.task('mocha', ['jshint'], function() {
  return gulp.src([
    './test/setup/node.js',
    './test/setup/helpers.js',
    './test/unit/**/*.js'
  ], { read: false })
    .pipe($.plumber())
    .pipe($.mocha({ reporter: reporter }));
});

gulp.task('build', [
  'clean',
  'html',
  'styles',
  'scripts',
  'test'
]);

gulp.task('test', [
  'jshint',
  'mocha'
]);

gulp.task('watch', ['build'], function(cb) {
  browserSync({
    server: {
      baseDir: 'dist',
      middleware: function(req, res, next) {
        api(req, res, next);
      }
    }
  });

  reporter = 'dot';
  bundler(true).on('update', function() {
    gulp.start('scripts');
    gulp.start('test');
  });
  gulp.watch('./test/**/*.js', ['test']);
  gulp.watch(['./src/main.less', './src/**/*.less'], ['styles']);
  gulp.watch(['./src/*.html'], ['html']);
});

gulp.task('default', ['watch']);
