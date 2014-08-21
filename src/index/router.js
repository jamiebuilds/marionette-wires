var Router = require('src/common/router');
var View = require('./view');

module.exports = Router.extend({
  initialize: function(options) {
    this.container = options.container;
  },

  routes: {
    '': 'index'
  },

  index: function() {
    this.view = new View();
    this.container.show(this.view);
  }
});
