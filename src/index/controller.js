var Marionette = require('backbone.marionette');

var IndexView = require('./view');

module.exports = Marionette.Controller.extend({
  initialize: function (options) {
    this.container = options.container;
  },

  index: function () {
    var indexView = new IndexView();
    this.container.show(indexView);
  }
});
