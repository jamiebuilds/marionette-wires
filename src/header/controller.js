var Marionette = require('backbone.marionette');
var Backone = require('backbone');
var HeaderView = require('./item-view');

var headerChannel = Backone.Wreqr.radio.channel('header');

module.exports = Marionette.Controller.extend({
  initialize: function (options) {
    this.container  = options.container;
    this.collection = options.collection;

    this.view = new HeaderView();
    this.container.show(this.view);
  }
});
