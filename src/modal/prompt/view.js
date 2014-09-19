var Radio = require('backbone.radio');
var View = require('src/common/view');
var Model = require('src/common/model');
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
    'submit'             : 'onSubmit',
    'click .btn-default' : 'onCancel',
    'click .close'       : 'onCancel'
  },

  onSubmit: function(e) {
    e.preventDefault();
    var self = this;
    var val = this.ui.input.val();
    Radio.request('modal', 'close').then(function() {
      self.trigger('submit', val);
    });
  },

  onCancel: function() {
    var self = this;
    Radio.request('modal', 'close').then(function() {
      self.trigger('cancel');
    });
  }
});
