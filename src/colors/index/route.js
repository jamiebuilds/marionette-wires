var _ = require('lodash');
var Route = require('src/common/route');
var Collection = require('../collection');
var View = require('./composite-view');

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

  render: function(params) {
    var page = params && parseInt(params.page) || 1;

    this.view = new View({
      collection: this.collection,
      page: page
    });

    this.container.show(this.view);
  }
});
