var Route = require('src/common/route');
var LibraryView = require('../library/collection-view');
var ViewerView  = require('../viewer/view');

module.exports = Route.extend({
  initialize: function(options) {
    this.layout = options.layout;
    this.collection = options.collection;
  },

  fetch: function() {
    if (this.collection.isNew()) {
      return this.collection.fetch();
    }
  },

  onFetch: function(id) {
    this.model = this.collection.get(id);
    this.collection.active = this.model;
  },

  render: function() {
    this.library = new LibraryView({
      collection: this.collection
    });

    this.viewer = new ViewerView({
      model: this.model
    });

    this.layout.library.show(this.library);
    this.layout.viewer.show(this.viewer);
  }
});
