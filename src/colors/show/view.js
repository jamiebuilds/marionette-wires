var Marionette = require('backbone.marionette');
var Backbone = require('backbone');
var ModalView = require('../modal/view');
var template = require('./template.hbs');

module.exports = Marionette.ItemView.extend({
  template: template,
  className: 'colors container',

  initialize: function (options) {
    this.model = options.model;
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'destroy', this.handleDestroy);
  },

  events: {
    'click .colors__toggle' : 'handleToggle',
    'click .colors__destroy' : 'confirmDestroy'
  },

  handleToggle: function() {
    this.model.set('active', !this.model.get('active'));
    this.model.save();
  },

  confirmDestroy: function () {
    var modalView = new ModalView({
      model: this.model
    });
  },

  handleDestroy: function() {
    Backbone.history.navigate('colors', { trigger: true });
  }
});
