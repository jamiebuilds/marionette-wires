var $ = require('jquery');
var Backbone = require('backbone');
require('jquery.bootstrap');
require('backbone.syphon');

var Application = require('./application/application');

Application.on('start', function() {
  Backbone.history.start();
});

$(function() {
  Application.start();
});
