var Route = require('../common/route');
var View = require('./view');

module.exports = Route.extend({
  initialize: function(options) {
    this.container = options.container;
  },

  render: function() {
    this.view = new View();
    this.container.show(this.view);
  }
});
