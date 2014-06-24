var Marionette = require('backbone.marionette');
var Backbone = require('backbone');
var _ = require('underscore');
var Router = require('./router');
var LayoutView = require('./layout-view');
var ModalController = require('../modal/controller');

var applicationChannel = Backbone.Wreqr.radio.channel('application');

var modules = [
  require('../index/router'),
  require('../colors/router')
];

module.exports = Marionette.Controller.extend({
  initialize: function() {
    this.router = new Router();
    this.layout = new LayoutView();
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
