var Backbone = require('backbone');
var Radio = require('./radio');

var flashesChannel = Radio.channel('flashes');

module.exports = Backbone.Model.extend({
  constructor: function() {
    Backbone.Model.apply(this, arguments);
    this.on('request', this.handleRequest);
    this.on('error', this.handleError);
  },

  handleRequest: function() {
    flashesChannel.vent.trigger('remove', this.serverError);
    delete this.serverError;
  },

  handleError: function() {
    this.serverError = { type: 'danger', title: 'Server Error' };
    flashesChannel.vent.trigger('add', this.serverError);
  },

  cleanup: function() {
    if (this.serverError) {
      flashesChannel.vent.trigger('remove', this.serverError);
    }
    delete this.serverError;
    delete this.validationError;
  }
});
