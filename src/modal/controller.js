var Marionette = require('backbone.marionette');
var Backbone = require('backbone');
var _ = require('underscore');
var LayoutView = require('./layout-view');

var modalChannel = Backbone.Wreqr.radio.channel('modal');
var applicationChannel = Backbone.Wreqr.radio.channel('application');

module.exports = Marionette.Controller.extend({
  initialize: function (options) {
    _.bindAll(this, 'openModal', 'destroyModal');

    this.container = options.container;
    this.layout = new LayoutView();
    this.container.show(this.layout);

    modalChannel.commands.setHandler('open', this.openModal);
    modalChannel.commands.setHandler('destroy', this.destroyModal);
  },

  openModal: function (options) {
    this.layout.openModal(options);

    this.listenToOnce(applicationChannel.vent, 'route', function () {
      this.destroyModal();
    });
  },

  destroyModal: function (options) {
    this.layout.destroyModal(options);
  }
});
