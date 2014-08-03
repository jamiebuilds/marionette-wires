var View = require('../../classes/view');
var Radio = require('backbone.radio');
var _ = require('underscore');
var Backbone = require('backbone');
var ModalView = require('../modal/view');
var template = require('./template.hbs');

var flashesChannel = Radio.channel('flashes');

module.exports = View.extend({
  template: template,
  className: 'colors container',

  initialize: function (options) {
    _.bindAll(this, 'handleToggleFailure', 'handleDestroySuccess');
    this.model = options.model;
    this.model.cleanup();
  },

  templateHelpers: function() {
    return {
      errors: this.model.validationError
    };
  },

  events: {
    'click .colors__toggle' : 'handleToggle',
    'click .colors__destroy' : 'handleDestroy'
  },

  modelEvents: {
    'all': 'render'
  },

  handleToggle: function() {
    this.model.set('active', !this.model.get('active'));
    this.model.save().fail(this.handleToggleFailure);
  },

  handleToggleFailure: function() {
    this.model.set('active', this.model.previous('active'));
  },

  handleDestroy: function () {
    this.modalView = new ModalView({
      model: this.model
    });

    this.listenToOnce(this.modalView, 'confirm', this.handleConfirmDestroy);
    this.listenToOnce(this.modalView, 'cancel', this.handleCancelDestroy);
  },

  handleConfirmDestroy: function() {
    this.stopListening(this.modalView);
    delete this.modalView;
    this.model.destroy({ wait: true }).done(this.handleDestroySuccess);
  },

  handleCancelDestroy: function() {
    this.stopListening(this.modalView);
    delete this.modalView;
  },

  handleDestroySuccess: function() {
    Backbone.history.navigate('colors', { trigger: true });
    flashesChannel.trigger('add', {
      timeout : 5000,
      type    : 'info',
      title   : 'It\'s gone!',
      body    : 'You have deleted ' + this.model.get('name') + '.'
    });
  }
});
