var Router = require('src/common/router');
var Radio = require('backbone.radio');

var IndexRoute  = require('./index/route');
var CreateRoute = require('./create/route');
var ShowRoute   = require('./show/route');
var EditRoute   = require('./edit/route');

module.exports = Router.extend({
  initialize: function(options) {
    this.container = options.container;
  },

  routes: {
    'colors'          : 'index',
    'colors/new'      : 'create',
    'colors/:id'      : 'show',
    'colors/:id/edit' : 'edit'
  },

  index: function() {
    return new IndexRoute({
      container: this.container
    });
  },

  create: function() {
    return new CreateRoute({
      container: this.container
    });
  },

  show: function() {
    return new ShowRoute({
      container: this.container
    });
  },

  edit: function() {
    return new EditRoute({
      container: this.container
    });
  }
});
