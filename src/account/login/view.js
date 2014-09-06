var _ = require('underscore');
var Backbone = require('backbone');
var Radio = require('backbone.radio');
var View = require('src/common/view');
var FormBehavior = require('src/forms/behavior');
var ViewModel = require('./view-model');
var template = require('./template.hbs');

module.exports = View.extend({
  template: template,
  className: 'container',

  initialize: function() {
    this.model = new ViewModel();
  },

  behaviors: {
    form: { behaviorClass: FormBehavior }
  },

  events: {
    'submit form': 'handleSubmit'
  },

  handleSubmit: function() {
    var errors = this.model.validate(this.form);

    if (!errors) {
      Radio.request('auth', 'login', this.form)
        .done(_.bind(this.handleLoginSuccess, this));
    } else {
      this.errors = errors;
      this.render();
    }
  },

  handleLoginSuccess: function() {
    Backbone.history.navigate('account', { trigger: true });
  }
});
