var Radio = require('backbone.radio');
var View = require('src/common/view');
var Model = require('src/common/model');
var template = require('./template.hbs');

module.exports = View.extend({
  template: template,

  initialize: function() {
    this.model = new Model(this.options);
    Radio.request('modal', 'open', this);
  },

  events: {
    'click .btn-primary' : 'onConfirm',
    'click .close'       : 'onCancel'
  },

  onConfirm: function() {
    var self = this;
    Radio.request('modal', 'close').then(function() {
      self.trigger('confirm');
    });
  },

  onCancel: function() {
    var self = this;
    Radio.request('modal', 'close').then(function() {
      self.trigger('cancel');
    });
  }
});
