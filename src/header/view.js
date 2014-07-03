var View = require('../classes/view');
var Radio = require('../classes/radio');
var _ = require('underscore');
var template = require('./template.hbs');

var headerChannel = Radio.channel('header');

module.exports = View.extend({
  template: template,
  tagName: 'nav',
  className: 'navbar navbar-default navbar-fixed-top',
  attributes: {
    role: 'navigation'
  },

  templateHelpers: function() {
    return {
      navitems: this.navitems
    };
  },

  initialize: function() {
    this.navitems = [];
    this.listenTo(headerChannel.vent, 'add', this.addNavitem);
    this.listenTo(headerChannel.vent, 'active', this.setActive);
  },

  addNavitem: function(name, path) {
    this.navitems.push({ name: name, path: path });
    this.render();
  },

  setActive: function(name) {
    _.each(this.navitems, function(navitem) {
      navitem.active = (navitem.name === name);
    });
    this.render();
  }
});
