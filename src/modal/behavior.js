var Marionette = require('backbone.marionette');
var Behavior = require('../classes/behavior');
var Radio = require('../classes/radio');

var channel = Radio.channel('modal');

Marionette.Behaviors.behaviorsLookup.modal = Behavior.extend({
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
