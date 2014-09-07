var Marionette = require('backbone.marionette');
var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');

module.exports = Marionette.Object.extend({
  constructor: function() {
    this.initialize.apply(this, arguments);
  },

  _triggerMethod: function(name, args) {
    if (this.router) {
      this.router.triggerMethod.apply(this.router, [name + ':route'].concat(args));
    }
    this.triggerMethod.apply(this, [name].concat(args));
  },

  enter: function(args, router) {
    var self = this;
    this._triggerMethod('before:enter', args);
    this._triggerMethod('before:fetch', args);

    return $.when(this.fetch.apply(this, args)).then(function() {
      self._triggerMethod('fetch', args);
      self._triggerMethod('before:render', args);
    }).then(function() {
      return self.render.apply(self, args);
    }).then(function() {
      self._triggerMethod('render', args);
      self._triggerMethod('enter', args);
    }).fail(function() {
      self._triggerMethod('error', args);
    });
  },

  navigate: function() {
    Backbone.history.navigate.apply(Backbone.history, arguments);
  },

  fetch  : function() {},
  render : function() {}
});
