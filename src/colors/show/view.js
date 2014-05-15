var Marionette = require('backbone.marionette');
var ModalView = require('../modal/view');
var template = require('./template.hbs');

module.exports = Marionette.ItemView.extend({
  template: template,
  className: 'colors container',

  initialize: function (options) {
    this.model = options.model;
    this.listenTo(this.model, 'change', this.render);
  },

  events: {
    'click .colors__toggle' : 'confirmToggle'
  },

  confirmToggle: function () {
    var modalView = new ModalView({
      model: this.model
    });
  }
});
