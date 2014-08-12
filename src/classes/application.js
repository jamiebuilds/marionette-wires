var Marionette = require('backbone.marionette');

module.exports = Marionette.Application.extend({
  // Polyfill for:
  // https://github.com/marionettejs/backbone.marionette/pull/1723
  constructor: function() {
    Marionette.Application.apply(this, arguments);
    this.initialize.apply(this, arguments);
  }
});
