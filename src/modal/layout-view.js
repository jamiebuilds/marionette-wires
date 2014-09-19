var LayoutView = require('src/common/layout-view');
var $ = require('jquery');
var template = require('./layout-template.hbs');

module.exports = LayoutView.extend({
  template: template,
  className: 'modal fade',

  attributes: {
    'tabindex' : -1,
    'role' : 'dialog'
  },

  regions: {
    content: '.modal-content'
  },

  initialize: function (options) {
    this.$el.modal({ show: false, backdrop: 'static' });
  },

  triggers: {
    'show.bs.modal'   : { preventDefault: false, event: 'before:open' },
    'shown.bs.modal'  : { preventDefault: false, event: 'open' },
    'hide.bs.modal'   : { preventDefault: false, event: 'before:close' },
    'hidden.bs.modal' : { preventDefault: false, event: 'close' }
  },

  open: function(view) {
    var deferred = $.Deferred();
    this.once('open', deferred.resolve);
    this.content.show(view);
    this.$el.modal('show');
    return deferred;
  },

  close: function() {
    var deferred = $.Deferred();
    this.once('close', function() {
      this.content.empty();
      deferred.resolve();
    });
    this.$el.modal('hide');
    return deferred;
  }
});
