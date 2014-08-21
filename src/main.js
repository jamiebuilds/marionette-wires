require('./plugins');
var Backbone = require('backbone');
var Application = require('src/application/application');

var app = new Application();

app.module('modal', {
  moduleClass: require('src/modal/module'),
  container: app.layout.overlay
});

app.module('header', {
  moduleClass: require('src/header/module'),
  container: app.layout.header
});

app.module('flashes', {
  moduleClass: require('src/flashes/module'),
  container: app.layout.flashes
});

app.module('index', {
  moduleClass: require('src/index/module'),
  container: app.layout.content
});

app.module('colors', {
  moduleClass: require('src/colors/module'),
  container: app.layout.content
});

app.module('books', {
  moduleClass: require('src/books/module'),
  container: app.layout.content
});

Backbone.history.start();
