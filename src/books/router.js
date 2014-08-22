var Router = require('../common/router');

var Collection = require('./collection');
var LayoutView = require('./layout-view');
var LibraryView = require('./library/collection-view');
var ViewerView = require('./viewer/view');

module.exports = Router.extend({
  initialize: function(options) {
    this.container = options.container;
  },

  routes: {
    'books'     : 'index',
    'books/:id' : 'show'
  },

  index: function() {
    this.navigate('books/1', { trigger: true });
  },

  show: function(id) {
    var self = this;
    if (this.collection) {
      this._showShowView(id);
    } else {
      this.collection = new Collection();
      this.collection.fetch().then(function() {
        self._showShowView(id);
      });
    }
  },

  _showShowView: function(id) {
    var model = this.collection.get(id);
    this.collection.active = model;
    this._showLayoutView();
    this._showLibraryView();
    this._showViewerView(model);
  },

  _showLayoutView: function() {
    this.layout = new LayoutView();
    this.container.show(this.layout);
  },

  _showLibraryView: function() {
    var library = new LibraryView({
      collection: this.collection
    });
    this.layout.library.show(library);
  },

  _showViewerView: function(model) {
    var viewer = new ViewerView({
      model: model
    });
    this.layout.viewer.show(viewer);
  }
});
