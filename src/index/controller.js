var Controller = require('../classes/controller');
var Radio = require('../classes/radio');
var View = require('./view');

var indexChannel = Radio.channel('colors');
var headerChannel = Radio.channel('header');

module.exports = Controller.extend({
  initialize: function (options) {
    this.container = options.container;
  },

  index: function () {
    this.view = new View();
    this.container.show(this.view);
    headerChannel.vent.trigger('active', 'Index');
  }
});
