var ItemView = require('../../common/item-view');
var template = require('./item-template.hbs');

module.exports = ItemView.extend({
  template: template,
  tagName: 'a',

  attributes: function() {
    return {
      'class' : 'list-group-item ' + (this.model.isActive() ? 'active' : ''),
      'href'  : '#books/' + this.model.get('id')
    };
  },

  modelEvents: {
    'all': 'render'
  }
});
