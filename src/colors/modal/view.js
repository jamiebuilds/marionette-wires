var View = require('../../classes/view');
var ModalBehavior = require('../../modal/behavior');
var template = require('./template.hbs');

module.exports = View.extend({
  template: template,

  behaviors: {
    modal: { behaviorClass: ModalBehavior }
  },

  events: {
    'click .btn-primary' : 'confirm',
    'click .btn-default' : 'cancel',
    'click .destroy' : 'cancel'
  },

  initialize: function () {
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
