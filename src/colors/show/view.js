var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var _ = require('underscore');
var template = require('./template.hbs');

module.exports = Marionette.ItemView.extend({
  template: template,
  className: 'colors container',

  initialize: function (options) {
    this.model = options.model;
    this.listenTo(this.model, 'change', this.render);
  }
});
