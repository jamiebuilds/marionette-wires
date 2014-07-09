var LayoutView = require('../classes/layout-view');
var template = require('./layout-template.hbs');

module.exports = LayoutView.extend({
  template: template,
  className: 'container',

  regions: {
    library : '.books__library',
    viewer  : '.books__viewer'
  }
});
