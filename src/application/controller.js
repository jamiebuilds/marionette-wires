var _ = require('underscore');
var Controller = require('../classes/controller');

var LayoutView = require('./layout-view');
var ModalController = require('../modal/controller');

module.exports = Controller.extend({
  initialize: function(options) {
    this.modules = options.modules;

    this.layout = new LayoutView();
    this.layout.render();

    this.modal = new ModalController({
      container: this.layout.overlay
    });

    _.each(this.modules, function(module) {
      module._controller = new module.controller({
        container: this.layout.content
      });
    }, this);
  }
});
