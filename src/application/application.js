var Application = require('src/common/application');
var LayoutView = require('./layout-view');

module.exports = Application.extend({
  initialize: function() {
    this.layout = new LayoutView();
    this.layout.render();
  }
});
