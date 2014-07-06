var Marionette = require('backbone.marionette');
var Radio = require('./radio');

var headerChannel = Radio.channel('header');

module.exports = Marionette.AppRouter.extend({
  title: null,
  rootPath: null,
  addToHeader: true,

  constructor: function() {
    Marionette.AppRouter.apply(this, arguments);
    this.on('route', this._onRoute);

    if (this.title && this.rootPath !== null && this.addToHeader) {
      headerChannel.vent.trigger('add', this.title, this.rootPath);
    }
  },

  _onRoute: function() {
    if (this.title && this.rootPath !== null) {
      headerChannel.vent.trigger('active', this.title);
    }
  }
});
