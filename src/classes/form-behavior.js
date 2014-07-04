var Marionette = require('backbone.marionette');
var Syphon = require('backbone.syphon');
var Behavior = require('./behavior');

Marionette.Behaviors.behaviorsLookup.form = Behavior.extend({
  events: {
    'submit form' : 'handleSubmit'
  },

  modelEvents: {
    'all': 'render'
  },

  render: function() {
    this.view.render();
  },

  onBeforeRender: function() {
    if (this._formData) {
      this._formData = Syphon.serialize(this);
    }
  },

  onDomRefresh: function () {
    if (!this._formData) {
      this._formData = this.view.model.attributes;
    }
    Syphon.deserialize(this, this._formData);
  },

  handleSubmit: function (event) {
    event.preventDefault();
    var data = Syphon.serialize(this);
    this.view.model.set(data);
  }
});
