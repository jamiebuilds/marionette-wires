var Marionette = require('backbone.marionette');
var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');

module.exports = Marionette.Object.extend({
  constructor: function() {
    this.initialize.apply(this, arguments);
  },

  enter: function(args) {
    var self = this;

    this.triggerMethod.apply(this, ['before:enter'].concat(args));
    this.triggerMethod.apply(this, ['before:fetch'].concat(args));

    return $.when(this.fetch.apply(this, args)).then(function() {
      self.triggerMethod.apply(self, ['fetch'].concat(args));
      self.triggerMethod.apply(self, ['before:render'].concat(args));
    }).then(function() {
      return self.render.apply(self, args);
    }).then(function() {
      self.triggerMethod.apply(self, ['render'].concat(args));
      self.triggerMethod.apply(self, ['enter'].concat(args));
    }).fail(function() {
      self.triggerMethod.apply(self, ['error'].concat(args));
    });
  },

  navigate: function() {
    Backbone.history.navigate.apply(Backbone.history, arguments);
  },

  fetch  : function() {},
  render : function() {}
});
