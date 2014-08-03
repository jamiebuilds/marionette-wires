var Marionette = require('backbone.marionette');
var Behavior = require('../classes/behavior');
var Radio = require('backbone.radio');

var channel = Radio.channel('modal');

Marionette.Behaviors.behaviorsLookup.modal = Behavior.extend({
  initialize: function () {
    this.listenToOnce(this.view, 'open',  this.openModal);
  },

  openModal: function (callback) {
    channel.command('open', {
      view: this.view,
      callback: callback
    });

    this.listenToOnce(this.view, 'destroy', this.destroyModal);
  },

  destroyModal: function (callback) {
    channel.command('destroy', {
      callback: callback
    });
  }
});
