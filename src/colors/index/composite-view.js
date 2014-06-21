var Marionette = require('backbone.marionette');
var ItemView = require('./item-view');
var template = require('./composite-template.hbs');

module.exports = Marionette.CompositeView.extend({
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
