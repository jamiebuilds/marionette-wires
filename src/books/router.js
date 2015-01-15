var Router = require('../common/router');
var Radio = require('backbone.radio');

var LayoutView = require('./layout-view');
var Collection = require('./collection');

var IndexRoute = require('./index/route');
var ShowRoute = require('./show/route');

module.exports = Router.extend({
  initialize: function(options) {
    this.container = options.container;
    this.collection = new Collection();
  },

  onBeforeEnter: function() {
    this.layout = new LayoutView();
    this.container.show(this.layout);
    Radio.command('header', 'activate', { path: 'books' });
  },

  routes: {
    'books'     : 'index',
    'books/:id' : 'show'
  },

  index: function() {
    return new IndexRoute({
      collection: this.collection
    });
  },

  show: function() {
    return new ShowRoute({
      collection : this.collection,
      layout     : this.layout
    });
  }
});
