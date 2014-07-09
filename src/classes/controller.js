var Marionette = require('backbone.marionette');
var _ = require('underscore');
var Radio = require('./radio');

module.exports = Marionette.Controller.extend({
  channelName: false,

  constructor: function(options) {
    if (options && options.container) {
      this.container = options.container;
    }
    this.getChannel();
    this.bindChannelEvents();
    Marionette.Controller.apply(this, arguments);
  },

  getChannel: function() {
    var channelName = _.result(this, 'channelName');
    if (!channelName) return;
    this.channel = Radio.channel(channelName);
  },

  bindChannelEvents: function() {
    var channelEvents = this.getOption('channelEvents');

    if (this.channel && channelEvents) {
      this.bindEntityEvents(this.channel.vent, channelEvents);
    }
  },

  start: function() {},
  stop: function() {},

  bindEntityEvents: Marionette.proxyBindEntityEvents,
  unbindEntityEvents: Marionette.proxyUnbindEntityEvents
});
