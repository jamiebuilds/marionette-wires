import View from '../../common/view';
import nprogress from 'nprogress';
import Radio from 'backbone.radio';
import Backbone from 'backbone';
import template from './template.hbs';

export default View.extend({
  template: template,
  className: 'colors colors--show container',

  initialize(options) {
    this.model = options.model;
    this.model.cleanup();
  },

  templateHelpers() {
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

  handleToggle() {
    this.model.set('active', !this.model.get('active'));
    this.model.save().fail(this.handleToggleFailure);
  },

  handleToggleFailure() {
    this.model.set('active', this.model.previous('active'));
  },

  handleDestroy() {
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

  handleDestroySuccess() {
    Backbone.history.navigate('colors', { trigger: true });
    Radio.command('flashes', 'add', {
      timeout : 5000,
      type    : 'info',
      title   : 'It\'s gone!',
      body    : 'You have deleted ' + this.model.get('name') + '.'
    });
  }
});
