var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
require('jquery.bootstrap');
require('backbone.syphon');

var Application = require('./application/application');

Application.on('start', function() {
  Backbone.history.start();
});

Application.start();
