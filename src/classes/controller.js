var Marionette = require('backbone.marionette');
var _ = require('underscore');

module.exports = Marionette.Controller.extend({
  constructor: function(options) {
    if (options && options.container) {
      this.container = options.container;
    }
    Marionette.Controller.apply(this, arguments);
  },

  start: function() {},
  stop: function() {}
});
