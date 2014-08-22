var _ = require('underscore');
var Route = require('src/common/route');
var Model = require('../model');
var View = require('./view');

module.exports = Route.extend({
  initialize: function(options) {
    this.container = options.container;
  },

  fetch: function(id) {
    this.model = new Model({ id: id });
    return this.model.fetch();
  },

  render: function() {
    this.view = new View({
      model: this.model
    });
    this.container.show(this.view);
  }
});
