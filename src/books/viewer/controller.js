var Controller = require('../../classes/controller');
var View = require('./view');

module.exports = Controller.extend({
  channelName: 'books',

  channelEvents: {
    'select': 'select'
  },

  select: function(model) {
    var view = new View({ model: model });
    this.container.show(view);
  }
});
