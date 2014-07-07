var ItemView = require('../classes/item-view');
var template = require('./item-template.hbs');

module.exports = ItemView.extend({
  template: template,

  className: function() {
    return 'flashes__alert alert alert-' + this.model.get('type');
  },

  attributes: {
    role: 'alert'
  },

  events: {
    'click button.close' : 'dismiss'
  },

  dismiss: function() {
    this.model.destroy();
  }
});
