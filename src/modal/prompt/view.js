var Radio = require('backbone.radio');
var View = require('../../common/view');
var Model = require('../../common/model');
var template = require('./template.hbs');

module.exports = View.extend({
  template: template,
  tagName: 'form',

  ui: {
    'input' : 'input'
  },

  initialize: function() {
    this.model = new Model(this.options);
    Radio.request('modal', 'open', this);
  },

  events: {
    'submit'             : 'submit',
    'click .btn-default' : 'cancel',
    'click .close'       : 'cancel'
  },

  submit: function(e) {
    e.preventDefault();
    var self = this;
    var val = this.ui.input.val();
    Radio.request('modal', 'close').then(function() {
      self.trigger('submit', val);
    });
  },

  cancel: function() {
    var self = this;
    Radio.request('modal', 'close').then(function() {
      self.trigger('cancel');
    });
  }
});
