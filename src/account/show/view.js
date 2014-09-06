var $ = require('jquery');
var md5 = require('MD5');
var View = require('src/common/view');
var template = require('./template.hbs');

module.exports = View.extend({
  template: template,
  className: 'container',

  ui: {
    thumbnail: '.thumbnail'
  },

  templateHelpers: function() {
    return {
      url: 'http://www.gravatar.com/avatar/' + md5('me@thejameskyle.com') + '?s=300'
    };
  },

  onDomRefresh: function() {
    this.ui.thumbnail.tooltip();
  }
});
