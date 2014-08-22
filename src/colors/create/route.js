var _ = require('underscore');
var Route = require('src/common/route');
var Collection = require('../collection');
var Model = require('../model');
var View = require('./view');

module.exports = Route.extend({
  initialize: function(options) {
    _.bindAll(this, 'render');
    this.container = options.container;
  },

  onEnter: function() {
    this.fetch().then(this.render);
  },

  fetch: function() {
    this.collection = new Collection();
    return this.collection.fetch();
  },

  render: function() {
    this.view = new View({
      collection: this.collection,
      model: new Model()
    });
    this.container.show(this.view);
  }
});
