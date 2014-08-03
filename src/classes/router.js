var Marionette = require('backbone.marionette');
var _ = require('underscore');
var Radio = require('backbone.radio');

var routerChannel = Radio.channel('router');
var headerChannel = Radio.channel('header');

module.exports = Marionette.AppRouter.extend({
  title: null,
  rootPath: null,
  addToHeader: true,

  constructor: function() {
    Marionette.AppRouter.apply(this, arguments);
    this.on('route', this._onRoute);

    if (this.title && this.rootPath !== null && this.addToHeader) {
      headerChannel.trigger('add', this.title, this.rootPath);
    }

    this.listenTo(routerChannel, 'route', this._onGlobalRoute);
  },

  route: function(route, name, callback) {
    var router = this;

    var wrapped = function() {
      if (!router.started) {
        router.options.controller.start();
        router.started = true;
      }

      callback.apply(router, arguments);
    };

    Marionette.AppRouter.prototype.route.call(this, route, name, wrapped);
  },

  _onRoute: function() {
    routerChannel.trigger('route', this);

    if (this.title && this.rootPath !== null) {
      headerChannel.trigger('active', this.title);
    }
  },

  _onGlobalRoute: function(router) {
    if (router !== this && this.started) {
      this.options.controller.stop();
      this.started = false;
    }
  }
});
