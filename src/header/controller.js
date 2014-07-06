var Controller = require('../classes/controller');
var View = require('./view');

module.exports = Controller.extend({
  initialize: function (options) {
    this.container  = options.container;
    this.collection = options.collection;

    this.view = new View();
    this.container.show(this.view);
  }
});
