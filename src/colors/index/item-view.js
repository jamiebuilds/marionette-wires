var ItemView = require('src/common/item-view');
var template = require('./item-template.hbs');

module.exports = ItemView.extend({
  tagName: 'a',
  template: template,
  className: 'colors__item list-group-item',

  attributes: function () {
    return {
      href: '#colors/' + this.model.get('id')
    };
  },

  modelEvents: {
    'all': 'render'
  }
});
