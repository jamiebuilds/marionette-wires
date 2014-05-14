var Marionette = require('backbone.marionette');
var applicationChannel = require('../application/channel');

var HeaderCollection = require('./collection');
var HeaderView = require('./composite-view');

module.exports = Marionette.Controller.extend({
  initialize: function (options) {
    this.router     = options.router;
    this.container  = options.container;
    this.collection = options.collection;
  },

  render: function () {
    var headerCollection = new HeaderCollection(this.collection);

    var headerView = new HeaderView({
      collection: headerCollection
    });

    this.container.show(headerView);

    this.listenTo(applicationChannel.vent, 'route', function (routeName) {
      headerCollection.setActive(routeName);
      headerView.render();
    });
  }
});
