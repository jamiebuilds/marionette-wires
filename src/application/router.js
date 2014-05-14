var Marionette = require('backbone.marionette');
var channel = require('./channel');

module.exports = Marionette.AppRouter.extend({
  onRoute: function (routeName, routePath, routeRegex, routeArgs) {
    channel.vent.trigger('route', routeName, routePath, routeRegex, routeArgs);
  }
});
