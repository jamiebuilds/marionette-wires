var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var $ = require('jquery');
var _ = require('underscore');
var ItemView = require('./item-view');
var template = require('./composite-template.hbs');

module.exports = Marionette.CompositeView.extend({
  template: template,
  className: 'colors container',

  itemView: ItemView,
  itemViewContainer: 'div.list-group',

  events: {
    'click .color__deactivate' : 'toggleActive'
  },

  initialize: function (options) {
    this.collection = options.collection;
    this.model = options.model;
    this.listenTo(this.collection, 'change', this.render);
  },

  toggleActive: function (event) {
    event.preventDefault();
    this.children.find(function (child) {
      return !!$(event.target).closest(child.$el).length;
    }).toggleActive();
  }
});
