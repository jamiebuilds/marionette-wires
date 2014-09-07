var nprogress = require('nprogress');
var Backbone = require('backbone');
var FormBehavior = require('src/forms/behavior');
var _ = require('underscore');
var View = require('src/common/view');
var template = require('./template.hbs');

module.exports = View.extend({
  template: template,
  className: 'colors container',

  behaviors: {
    form: { behaviorClass: FormBehavior }
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
      nprogress.start();
      this.model
        .save(this.form)
        .done(this.handleSaveSuccess);
    } else {
      this.model.validationError = errors;
      this.render();
    }
  },

  handleSaveSuccess: function () {
    Backbone.history.navigate('colors/' + this.model.id, { trigger: true });
  }
});
