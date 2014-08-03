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
  },

  _onRoute: function() {
    routerChannel.trigger('route', this);

    if (this.title && this.rootPath !== null) {
      headerChannel.trigger('active', this.title);
    }
  }
});
