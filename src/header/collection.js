var _ = require('underscore');
var Backbone = require('backbone');
var Model = require('./model');

module.exports = Backbone.Collection.extend({
  model: Model,

  setActive: function (route) {
    _.each(this.models, function (model) {
      if (model.get('route') === route) {
        model.set('active', true);
      } else {
        model.set('active', false);
      }
    });
  }
});
