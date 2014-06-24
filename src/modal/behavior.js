var Marionette = require('backbone.marionette');
var Backbone = require('backbone');

var channel = Backbone.Wreqr.radio.channel('modal');

module.exports = Marionette.Behavior.extend({
  initialize: function () {
    this.listenToOnce(this.view, 'open',  this.openModal);
  },

  openModal: function (callback) {
    channel.commands.execute('open', {
      view: this.view,
      callback: callback
    });

    this.listenToOnce(this.view, 'destroy', this.destroyModal);
  },

  destroyModal: function (callback) {
    channel.commands.execute('destroy', {
      callback: callback
    });
  }
});
