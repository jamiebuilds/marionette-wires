var Router = require('src/common/router');
var IndexRoute = require('./route');

module.exports = Router.extend({
  initialize: function(options) {
    this.container = options.container;
  },

  routes: {
    '': 'index'
  },

  index: function() {
    return new IndexRoute({
      container: this.container
    });
  }
});
