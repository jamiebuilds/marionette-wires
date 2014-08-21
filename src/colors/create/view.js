var View = require('src/common/view');
var FormBehavior = require('src/forms/behavior');
var _ = require('underscore');
var Backbone = require('backbone');
var template = require('./template.hbs');

module.exports = View.extend({
  template: template,
  className: 'colors container',

  behaviors: {
    form: { behaviorClass: FormBehavior }
  },

  templateHelpers: function() {
    return {
      errors: this.errors
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
      this.errors = errors;
      this.render();
    }
  },

  handleSaveSuccess: function () {
    this.collection.add(this.model);
    Backbone.history.navigate('colors', { trigger: true });
  }
});
