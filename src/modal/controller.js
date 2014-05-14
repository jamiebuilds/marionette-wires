var Marionette = require('backbone.marionette');
var applicationChannel = require('../application/channel');
var _ = require('underscore');
var channel = require('./channel');
var ModalView = require('./view');

module.exports = Marionette.Controller.extend({
  initialize: function (options) {
    this.container = options.container;
    this.modalView = new ModalView();
    this.container.show(this.modalView);

    _.bindAll(this, 'openModal', 'closeModal');
    channel.commands.setHandler('open', this.openModal);
    channel.commands.setHandler('close', this.closeModal);
  },

  openModal: function (options) {
    this.modalView.openModal(options);

    this.listenToOnce(applicationChannel.vent, 'route', function () {
      this.closeModal();
    });
  },

  closeModal: function (options) {
    this.modalView.closeModal(options);
  }
});
