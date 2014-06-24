var Backbone = require('backbone');
var Syphon = require('backbone.syphon');
var Marionette = require('backbone.marionette');
var template = require('./template.hbs');

module.exports = Marionette.ItemView.extend({
  template: template,
  className: 'colors container',

  templateHelpers: function() {
    return {
      errors: this.model.validationError
    };
  },

  events: {
    'submit .colors__form' : 'handleSubmit'
  },

  initialize: function (options) {
    this.model = options.model;
    this.listenTo(this.model, 'all', this.render);
  },

  onDomRefresh: function () {
    Syphon.deserialize(this, this.model.attributes);
    this.once('before:render', this._reserialize);
  },

  _reserialize: function() {
    var data = Syphon.serialize(this);
    this.model.set(data, { silent: true });
  },

  handleSubmit: function (event) {
    event.preventDefault();

    var data = Syphon.serialize(this);
    this.model.set(data);

    if (this.model.isValid()) {
      this.handleValid();
    }
  },

  handleValid: function () {
    this.model.save();
    Backbone.history.navigate('colors/' + this.model.id, { trigger: true });
  }
});
