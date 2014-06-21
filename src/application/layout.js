var Marionette = require('backbone.marionette');
var template = require('./template.hbs');

var HeaderController = require('../header/controller');

module.exports = Marionette.LayoutView.extend({
  el: '.application',
  template: template,

  regions: {
    header  : '.application__header',
    content : '.application__content',
    overlay : '.application__overlay'
  },

  onRender: function () {
    var headerController = new HeaderController({
      container  : this.header,
      collection : [
        { name: 'Colors', path: 'colors', route: 'colorsList' }
      ]
    });

    headerController.render();
  }
});
