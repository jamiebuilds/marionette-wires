var ItemView = require('../../classes/item-view');
var Radio = require('../../classes/radio');
var template = require('./item-template.hbs');

var booksChannel = Radio.channel('books');

module.exports = ItemView.extend({
  template: template,
  tagName: 'a',
  className: 'list-group-item',

  attributes: function() {
    return {
      'href'  : '#books/' + this.model.get('id')
    };
  },

  modelEvents: {
    'all': 'render'
  },

  initialize: function() {
    this.listenTo(booksChannel.vent, 'select', this.select);
  },

  select: function(model) {
    if (model === this.model) {
      this.$el.addClass('active');
    } else {
      this.$el.removeClass('active');
    }
  }
});
