var _ = require('underscore');
var Backbone = require('backbone');
var Controller = require('../classes/controller');
var Radio = require('../classes/radio');

var Router = require('./router');
var LayoutView = require('./layout-view');
var ModalController = require('../modal/controller');

Radio.channel('application');

var modules = [
  require('../index/router'),
  require('../colors/router')
];

module.exports = Controller.extend({
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
