var Radio = require('backbone.radio');
var Controller = require('../../classes/controller');
var View = require('./view');

var channel = Radio.channel('books');

module.exports = Controller.extend({
  initialize: function() {
    channel.on('select', this.select, this);
  },

  select: function(model) {
    var view = new View({ model: model });
    this.container.show(view);
  }
});
