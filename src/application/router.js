var Marionette = require('backbone.marionette');
var Backbone = require('backbone');

var applicationChannel = Backbone.Wreqr.radio.channel('application');

module.exports = Marionette.AppRouter.extend({
  onRoute: function (routeName, routePath, routeRegex, routeArgs) {
    applicationChannel.vent.trigger('route', routeName, routePath, routeRegex, routeArgs);
  }
});
