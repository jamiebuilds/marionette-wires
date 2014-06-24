var Marionette = require('backbone.marionette');
var Backbone = require('backbone');
var HeaderCollection = require('./collection');
var HeaderView = require('./composite-view');

var applicationChannel = Backbone.Wreqr.radio.channel('application');

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
