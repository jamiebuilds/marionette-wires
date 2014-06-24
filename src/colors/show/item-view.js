var Marionette = require('backbone.marionette');
var _ = require('underscore');
var Backbone = require('backbone');
var ModalView = require('../modal/item-view');
var template = require('./item-template.hbs');

module.exports = Marionette.ItemView.extend({
  template: template,
  className: 'colors container',

  initialize: function (options) {
    _.bindAll(this, 'handleToggleFailure', 'handleDestroySuccess');
    this.model = options.model;
    this.model.cleanup();
  },

  templateHelpers: function() {
    return {
      errors: this.model.validationError,
      serverError: this.model.serverError
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
  }
});
