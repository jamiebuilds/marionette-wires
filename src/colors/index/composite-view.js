var CompositeView = require('src/common/composite-view');
var ItemView = require('./item-view');
var template = require('./composite-template.hbs');

module.exports = CompositeView.extend({
  template: template,
  className: 'colors container',

  childView: ItemView,
  childViewContainer: 'div.list-group',

  collectionEvents: {
    'change': 'render'
  }
});
