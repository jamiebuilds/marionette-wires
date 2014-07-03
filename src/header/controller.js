var Controller = require('../classes/controller');
var Radio = require('../classes/radio');
var View = require('./view');

var headerChannel = Radio.channel('header');

module.exports = Controller.extend({
  initialize: function (options) {
    this.container  = options.container;
    this.collection = options.collection;

    this.view = new View();
    this.container.show(this.view);
  }
});
