var Marionette = require('backbone.marionette');
var template = require('./item-template.hbs');

module.exports = Marionette.ItemView.extend({
  template: template,

  behaviors: {
    modal: {}
  },

  events: {
    'click .btn-primary' : 'confirm',
    'click .btn-default' : 'cancel',
    'click .destroy' : 'cancel'
  },

  initialize: function (options) {
    this.model = options.model;
    this.trigger('open');
  },

  confirm: function () {
    this.trigger('confirm');
    this.trigger('destroy');
  },

  cancel: function () {
    this.trigger('cancel');
    this.trigger('destroy');
  }
});
