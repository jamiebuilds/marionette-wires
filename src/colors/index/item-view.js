var Marionette = require('backbone.marionette');
var template = require('./item-template.hbs');
var ModalView = require('../modal/view');

module.exports = Marionette.ItemView.extend({
  tagName: 'a',
  template: template,

  attributes: function () {
    var classes = ['colors__item', 'list-group-item'];

    if (this.model.get('active')) {
      classes.push('active');
    }

    return {
      href: '#colors/' + this.model.get('id'),
      class: classes.join(' ')
    };
  },

  initialize: function (options) {
    this.listenTo(this.model, 'all', this.render);
  },

  toggleActive: function () {
    var modalView = new ModalView({
      model: this.model
    });
  }
});
