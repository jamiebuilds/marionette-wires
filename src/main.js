require('./plugins');
var Backbone = require('backbone');
var Application = require('./application/application');

var app = new Application();

app.module('modal', {
  moduleClass: require('./modal/module'),
  container: app.layout.overlay
});

app.module('header', {
  moduleClass: require('./header/module'),
  container: app.layout.header
});

app.module('flashes', {
  moduleClass: require('./flashes/module'),
  container: app.layout.flashes
});

app.module('index', {
  moduleClass: require('./index/module'),
  container: app.layout.content
});

app.module('colors', {
  moduleClass: require('./colors/module'),
  container: app.layout.content
});

app.module('books', {
  moduleClass: require('./books/module'),
  container: app.layout.content
});

Backbone.history.start();
