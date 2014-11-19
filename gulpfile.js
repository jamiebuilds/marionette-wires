var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserify = require('browserify');
var watchify = require('watchify');
var remapify = require('remapify');
var source = require('vinyl-source-stream');
var stylish = require('jshint-stylish');
var path = require('path');
var merge = require('merge-stream');
var buffer = require('vinyl-buffer');
var _ = require('lodash');

var browserSync = require('browser-sync');
var reload = browserSync.reload;

var api = require('./api/api');

gulp.task('clean', function() {
  return gulp.src('app/tmp', {read: false})
    .pipe($.plumber())
    .pipe($.clean());
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

var bundler;
function getBundler() {
  if (!bundler) {
    bundler = watchify(browserify('./src/main.js', _.extend({ debug: true }, watchify.args)));

    bundler.plugin(remapify, [{
      src: '**/*.js',
      expose: 'src',
      cwd: path.join(__dirname, 'src')
    }]);
  }
  return bundler;
};

function bundle() {
  return getBundler().bundle()
    .on('error', $.util.log)
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe($.sourcemaps.init({ loadMaps: true }))
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest('./dist'))
    .pipe(reload({ stream: true }));
}

gulp.task('scripts', function() {
  process.env.BROWSERIFYSWAP_ENV = 'dist';
  return bundle();
});

gulp.task('jshint', function() {
  return gulp.src(['./src/**/*.js', './test/**/*.js'])
    .pipe($.plumber())
    .pipe($.jshint())
    .pipe($.jshint.reporter(stylish));
});

gulp.task('symlink', function() {
  return gulp.src('./src')
    .pipe($.plumber())
    .pipe($.symlink('./node_modules'));
});

var reporter = 'spec';

gulp.task('mocha', ['jshint', 'symlink'], function() {
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

gulp.task('watch', ['build'], function() {
  browserSync({
    server: {
      baseDir: 'dist',
      middleware: function(req, res, next) {
        api(req, res, next);
      }
    }
  });

  reporter = 'dot';
  getBundler().on('update', function() {
    gulp.start('scripts');
    gulp.start('test');
  });
  gulp.watch('./test/**/*.js', ['test']);
  gulp.watch(['./src/main.less', './src/**/*.less'], ['styles']);
});

gulp.task('default', ['watch']);
