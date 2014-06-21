var Marionette = require('backbone.marionette');
var template = require('./template.hbs');
var ModalBehavior = require('../../modal/behavior');

module.exports = Marionette.ItemView.extend({
  template: template,

  behaviors: {
    Modal: {
      behaviorClass: ModalBehavior
    }
  },

  events: {
    'click .btn-primary' : 'confirm',
    'click .btn-default' : 'cancel',
    'click .destroy' : 'cancel'
  },

  initialize: function (options) {
    this.model = options.model;
    this.trigger('modal:open');
  },

  confirm: function () {
    this.model.set('active', !this.model.get('active'));
    this.trigger('modal:destroy');
  },

  cancel: function () {
    this.trigger('modal:destroy');
  }
});
