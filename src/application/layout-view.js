var LayoutView = require('../classes/layout-view');
var template = require('./layout-template.hbs');

var HeaderController = require('../header/controller');

module.exports = LayoutView.extend({
  el: '.application',
  template: template,

  regions: {
    header  : '.application__header',
    content : '.application__content',
    overlay : '.application__overlay'
  },

  onRender: function () {
    var header = new HeaderController({
      container: this.header
    });
  }
});
