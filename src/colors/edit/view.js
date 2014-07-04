var Backbone = require('backbone');
var _ = require('underscore');
var View = require('../../classes/view');
var template = require('./template.hbs');

module.exports = View.extend({
  template: template,
  className: 'colors container',

  templateHelpers: function() {
    return {
      errors: this.model.validationError,
      serverError: this.model.serverError
    };
  },

  behaviors: {
    form: {}
  },

  initialize: function () {
    _.bindAll(this, 'handleSaveSuccess');
    this.model.cleanup();
  },

  events: {
    'submit form': 'handleSubmit'
  },

  handleSubmit: function () {
    if (this.model.isValid()) {
      this.model.save().done(this.handleSaveSuccess);
    }
  },

  handleSaveSuccess: function () {
    Backbone.history.navigate('colors/' + this.model.id, { trigger: true });
  }
});
