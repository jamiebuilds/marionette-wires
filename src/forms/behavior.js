var Syphon = require('backbone.syphon');
var Behavior = require('src/common/behavior');

module.exports = Behavior.extend({
  events: {
    'submit form' : 'handleSubmit'
  },

  modelEvents: {
    'change' : 'onChange'
  },

  serialize: function() {
    this.view.form = Syphon.serialize(this);
  },

  deserialize: function() {
    return Syphon.deserialize(this, this.view.form);
  },

  onChange: function() {
    this.view.form = this.view.model.attributes;
    this.deserialize();
  },

  onBeforeRender: function() {
    if (this.view.form) {
      this.serialize();
    }
  },

  onDomRefresh: function () {
    if (!this.view.form) {
      this.view.form = this.view.model.attributes;
    }
    this.deserialize();
  },

  handleSubmit: function (event) {
    event.preventDefault();
    this.view.form = Syphon.serialize(this);
  }
});
