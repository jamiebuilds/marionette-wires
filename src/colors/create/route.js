var _ = require('underscore');
var Route = require('src/common/route');
var Collection = require('../collection');
var Model = require('../model');
var View = require('./view');

module.exports = Route.extend({
  initialize: function(options) {
    this.container = options.container;
    this.collection = options.collection;
  },

  fetch: function() {
    if (this.collection.isNew()) {
      return this.collection.fetch();
    }
  },

  render: function() {
    this.model = new Model();
    this.view = new View({
      collection: this.collection,
      model: this.model
    });
    this.container.show(this.view);
  }
});
