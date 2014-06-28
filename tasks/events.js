var _ = require('underscore');
var minimatch = require('minimatch');
var path = require('path');

var changes = {
  'test/unit/**/*.spec.js': function(config, filepath) {
    config['mochaTest.tests.src']    = ['test/setup/helpers.js', filepath];
    config['jshint.javascripts.src'] = [];
    config['jshint.tests.src']       = [filepath];
  },
  'src/**/*.js': function(config, filepath) {
    var file = filepath.replace('src', 'test/unit').replace('.js', '.spec.js');
    config['mochaTest.tests.src']    = ['test/setup/helpers.js', file];
    config['jshint.javascripts.src'] = [filepath];
    config['jshint.tests.src']       = [];
  },
  'src/**/*.hbs': function(config, filepath) {
    var basename = path.basename(filepath);
    var file = filepath.replace('src', 'test/unit').replace(basename, '**/**');
    config['mochaTest.tests.src']    = ['test/setup/helpers.js', file];
    config['jshint.javascripts.src'] = [];
    config['jshint.tests.src']       = [];
  },
  'src/**/**': function(config) {
    config['mochaTest.tests.src']    = [];
    config['jshint.javascripts.src'] = [];
    config['jshint.tests.src']       = [];
  }
};

module.exports = function(grunt) {
  var defaults = {
    'mochaTest.tests.src'    : grunt.config('mochaTest.tests.src'),
    'jshint.javascripts.src' : grunt.config('jshint.javascripts.src'),
    'jshint.tests.src'       : grunt.config('jshint.tests.src')
  };

  grunt.event.on('watch', function(action, filepath) {
    var updates = _.clone(defaults);

    var change = _.find(changes, function(callback, glob) {
      return minimatch.match([filepath], glob).length;
    });

    change(updates, filepath);

    _.each(updates, function(value, config) {
      grunt.config(config, value);
    });
  });
};
