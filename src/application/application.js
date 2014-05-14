var Marionette = require('backbone.marionette');
var _ = require('underscore');
var Application = new Marionette.Application();
var Router = require('./router');
var Layout = require('./layout');

var ModalController = require('../modal/controller');

var modules = [
  require('../index/router'),
  require('../colors/router')
];

Application.addInitializer(function() {
  this.router = new Router();
  this.layout = new Layout();
  this.layout.render();

  _.each(modules, function (module) {
    module.apply(this);
  }, this);

  var modalController = new ModalController({
    container: this.layout.overlay
  });
});

module.exports = Application;
