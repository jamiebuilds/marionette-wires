var Marionette = require('backbone.marionette');
var Backbone = require('backbone');
var _ = require('underscore');

var Router = require('./router');
var Layout = require('./layout');
var ModalController = require('../modal/controller');

var modules = [
  require('../index/router'),
  require('../colors/router')
];

var Application = Marionette.Controller.extend({
  initialize: function() {
    this.router = new Router();
    this.layout = new Layout();
    this.layout.render();

    this.modal = new ModalController({
      container: this.layout.overlay
    });

    _.each(modules, function (module) {
      module.apply(this);
    }, this);

    Backbone.history.start();
  }
});

module.exports = Application;
