var Marionette = require('backbone.marionette');
var channel = require('./channel');

module.exports = Marionette.Behavior.extend({
  initialize: function () {
    this.listenToOnce(this.view, 'modal:open',  this.openModal);
  },

  openModal: function (callback) {
    channel.commands.execute('open', {
      view: this.view,
      callback: callback
    });

    this.listenToOnce(this.view, 'modal:close', this.closeModal);
  },

  closeModal: function (callback) {
    channel.commands.execute('close', {
      callback: callback
    });
  }
});
