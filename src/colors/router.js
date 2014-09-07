var Router = require('src/common/router');

var Collection  = require('./collection');
var IndexRoute  = require('./index/route');
var CreateRoute = require('./create/route');
var ShowRoute   = require('./show/route');
var EditRoute   = require('./edit/route');

module.exports = Router.extend({
  initialize: function(options) {
    this.container = options.container;
    this.collection = new Collection();
  },

  routes: {
    'colors'          : 'index',
    'colors/new'      : 'create',
    'colors/:id'      : 'show',
    'colors/:id/edit' : 'edit'
  },

  index: function() {
    return new IndexRoute({
      container  : this.container,
      collection : this.collection
    });
  },

  create: function() {
    return new CreateRoute({
      container  : this.container,
      collection : this.collection
    });
  },

  show: function() {
    return new ShowRoute({
      container  : this.container,
      collection : this.collection
    });
  },

  edit: function() {
    return new EditRoute({
      container  : this.container,
      collection : this.collection
    });
  }
});
