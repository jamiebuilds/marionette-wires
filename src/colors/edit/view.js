var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var _ = require('underscore');
var template = require('./template.hbs');

module.exports = Marionette.ItemView.extend({
  template: template,
  className: 'colors container',

  events: {
    'submit .colors__form' : 'handleSubmit'
  },

  initialize: function (options) {
    this.model = options.model;
    this.listenTo(this.model, 'change', this.render);
  },

  onDomRefresh: function () {
    Backbone.Syphon.deserialize(this, this.model.attributes);
  },

  handleSubmit: function (event) {
    if (event) {
      event.preventDefault();
    }

    var data = Backbone.Syphon.serialize(this);
    var errors = this.model.validate(data);

    if (_.isUndefined(errors)) {
      window.location.hash = 'colors';
    } else {
      this.model.set('errors', errors);
      this.render();
    }
  }
});
