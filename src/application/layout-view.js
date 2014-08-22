var LayoutView = require('../common/layout-view');
var template = require('./layout-template.hbs');

module.exports = LayoutView.extend({
  el: '.application',
  template: template,

  regions: {
    header  : '.application__header',
    flashes : '.application__flashes',
    content : '.application__content',
    overlay : '.application__overlay'
  }
});
