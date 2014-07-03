var CompositeView = require('../../classes/composite-view');
var ItemView = require('./item-view');
var template = require('./composite-template.hbs');

module.exports = CompositeView.extend({
  template: template,
  className: 'colors container',

  childView: ItemView,
  childViewContainer: 'div.list-group',

  initialize: function (options) {
    this.collection = options.collection;
    this.model = options.model;
    this.listenTo(this.collection, 'change', this.render);
  }
});
