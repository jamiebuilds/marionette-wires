var Route = require('src/common/route');
var View = require('./view');

module.exports = Route.extend({
  initialize: function(options) {
    this.container = options.container;
  },

  render: function() {
    var view = new View();
    this.container.show(view);
  }
});
