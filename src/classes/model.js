var Backbone = require('backbone');
var Radio = require('backbone.radio');

var flashesChannel = Radio.channel('flashes');

module.exports = Backbone.Model.extend({
  constructor: function() {
    Backbone.Model.apply(this, arguments);
    this.on('request', this.handleRequest);
    this.on('error', this.handleError);
  },

  handleRequest: function() {
    flashesChannel.trigger('remove', this.serverError);
    delete this.serverError;
  },

  handleError: function() {
    this.serverError = { type: 'danger', title: 'Server Error' };
    flashesChannel.trigger('add', this.serverError);
  },

  cleanup: function() {
    if (this.serverError) {
      flashesChannel.trigger('remove', this.serverError);
    }
    delete this.serverError;
    delete this.validationError;
  }
});
