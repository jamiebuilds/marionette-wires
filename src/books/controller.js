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
      this.render(id);
    } else {
      this.collection = new Collection();
      this.collection.fetch().then(function() {
        self.render(id);
      });
    }
  },

  render: function(id) {
    var model = this.collection.get(id);
    this.collection.active = model;

    var layout = new LayoutView();

    var library = new LibraryView({
      collection: this.collection
    });

    var viewer = new ViewerView({
      model: model
    });

    this.container.show(layout);
    layout.library.show(library);
    layout.viewer.show(viewer);
  }
});
