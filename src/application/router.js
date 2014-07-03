var Router = require('../classes/router');
var Radio = require('../classes/radio');

var applicationChannel = Radio.channel('application');

module.exports = Router.extend({
  onRoute: function (routeName, routePath, routeRegex, routeArgs) {
    applicationChannel.vent.trigger('route', routeName, routePath, routeRegex, routeArgs);
  }
});
