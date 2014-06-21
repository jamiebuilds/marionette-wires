var Marionette = require('backbone.marionette');
var template = require('./composite-template.hbs');

var ItemView = require('./item-view');

module.exports = Marionette.CompositeView.extend({
  template: template,

  tagName: 'nav',
  className: 'navbar navbar-default navbar-fixed-top',
  attributes: {
    role: 'navigation'
  },

  childView: ItemView,
  childViewContainer: 'ul.navbar-nav',

  initialize: function () {
    this.listenTo(this.collection, 'all', this.render);
  }
});
