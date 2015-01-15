var View = require('../../common/view');
var nprogress = require('nprogress');
var Radio = require('backbone.radio');
var Backbone = require('backbone');
var template = require('./template.hbs');

module.exports = View.extend({
  template: template,
  className: 'colors colors--show container',

  initialize: function (options) {
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
    var self = this;
    Radio.request('modal', 'confirm', {
      title : 'Confirm Color Destruction',
      text  : 'Are you sure you want to destroy ' + this.model.get('name') + '?'
    }).then(function() {
      nprogress.start();
      return self.model.destroy({ wait: true });
    }).then(function() {
      self.handleDestroySuccess();
    });
  },

  handleDestroySuccess: function() {
    Backbone.history.navigate('colors', { trigger: true });
    Radio.command('flashes', 'add', {
      timeout : 5000,
      type    : 'info',
      title   : 'It\'s gone!',
      body    : 'You have deleted ' + this.model.get('name') + '.'
    });
  }
});
