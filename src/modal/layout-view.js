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
    this.$el.modal({ show: false });
  },

  triggers: {
    'show.bs.modal'   : { preventDefault: false, event: 'before:show' },
    'shown.bs.modal'  : { preventDefault: false, event: 'show' },
    'hide.bs.modal'   : { preventDefault: false, event: 'before:hide' },
    'hidden.bs.modal' : { preventDefault: false, event: 'hide' }
  },

  openModal: function(options) {
    options = options || {};
    var self = this;
    var deferred = $.Deferred();

    this.destroyModal().then(function() {
      self.once('show', options.callback);
      self.once('show', function() {
        self.isShown = true;
        deferred.resolve();
      });
      self.content.show(options.view);
      self.$el.modal('show');
    });

    return deferred;
  },

  destroyModal: function(options) {
    options = options || {};
    var self = this;
    var deferred = $.Deferred();

    if (this.isShown && !this.isDestroying) {
      this.isDestroying = true;
      this.once('hide', options.callback);
      this.once('hide', function() {
        self.content.empty();
        self.isShown = false;
        self.isDestroying = false;
        deferred.resolve();
      });
      this.$el.modal('hide');
    } else {
      deferred.resolve();
    }

    return deferred;
  }
});
