var Radio = require('backbone.radio');
var Controller = require('../classes/controller');
var Router = require('./router');
var LayoutView = require('./layout-view');

var Collection = require('./collection');

var LibraryView = require('./library/collection-view');
var ViewerView = require('./viewer/view');

module.exports = Controller.extend({
  initialize: function(options) {
    this.container = options.container;
    this.router = new Router({ controller: this });
    Radio.command('header', 'add', 'Books', 'books');
  },

  index: function() {
    this.router.navigate('books/1', { trigger: true });
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
