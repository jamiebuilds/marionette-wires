var View = require('src/common/view');
var template = require('./template.hbs');

module.exports = View.extend({
  template: template,
  tagName: 'nav',
  className: 'navbar navbar-default navbar-fixed-top',
  attributes: {
    role: 'navigation'
  },

  collectionEvents: {
    'all': 'render'
  }
});
