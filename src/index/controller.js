var Marionette = require('backbone.marionette');
var Backbone = require('backbone');
var IndexView = require('./item-view');

var indexChannel = Backbone.Wreqr.radio.channel('colors');
var headerChannel = Backbone.Wreqr.radio.channel('header');

module.exports = Marionette.Controller.extend({
  initialize: function (options) {
    this.container = options.container;
  },

  index: function () {
    var indexView = new IndexView();
    this.container.show(indexView);
    headerChannel.vent.trigger('active', 'Index');
  }
});
