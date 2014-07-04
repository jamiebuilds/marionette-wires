var View = require('../../classes/view');
var _ = require('underscore');
var Backbone = require('backbone');
var template = require('./template.hbs');

module.exports = View.extend({
  template: template,
  className: 'colors container',

  behaviors: {
    form: {}
  },

  templateHelpers: function() {
    return {
      errors: this.model.validationError,
      serverError: this.model.serverError
    };
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
    this.collection.add(this.model);
    Backbone.history.navigate('colors', { trigger: true });
  }
});
