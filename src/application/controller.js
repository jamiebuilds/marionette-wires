var _ = require('underscore');
var Controller = require('../classes/controller');

var LayoutView = require('./layout-view');

var ModalController = require('../modal/controller');
var HeaderController = require('../header/controller');
var FlashesController = require('../flashes/controller');

module.exports = Controller.extend({
  initialize: function(options) {
    this.modules = options.modules;

    this.layout = new LayoutView();
    this.layout.render();

    this.modal   = new ModalController({ container: this.layout.overlay });
    this.header  = new HeaderController({ container: this.layout.header });
    this.flashes = new FlashesController({ container: this.layout.flashes });

    _.each(this.modules, function(module) {
      module._controller = new module.controller({
        container: this.layout.content
      });
    }, this);
  }
});
