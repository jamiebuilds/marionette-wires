var Backbone = require('backbone');
var _ = require('underscore');
var View = require('../../classes/view');
var template = require('./template.hbs');

module.exports = View.extend({
  template: template,
  className: 'colors container',

  behaviors: {
    form: {}
  },

  templateHelpers: function() {
    return {
      errors: this.model.validationError
    };
  },

  initialize: function () {
    _.bindAll(this, 'handleSaveSuccess');
  },

  events: {
    'submit form': 'handleSubmit'
  },

  handleSubmit: function () {
    var errors = this.model.validate(this.form);

    if (!errors) {
      this.model.save(this.form).done(this.handleSaveSuccess);
    } else {
      this.model.validationError = errors;
      this.render();
    }
  },

  handleSaveSuccess: function () {
    Backbone.history.navigate('colors/' + this.model.id, { trigger: true });
  }
});
