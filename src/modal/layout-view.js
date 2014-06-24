var Marionette = require('backbone.marionette');
var template = require('./layout-template.hbs');

module.exports = Marionette.LayoutView.extend({
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

  openModal: function (options) {
    options = options || {};
    this.once('after:show', options.callback);
    this.setupModal(options);
    this.$el.modal('show');
  },

  destroyModal: function (options) {
    options = options || {};
    this.once('hide', options.callback);
    this.once('hide', this.teardownModal);
    this.$el.modal('hide');
  },

  setupModal: function (options) {
    options = options || {};
    if (this.isShown) this.teardownModal();
    this.content.show(options.view);
    this.isShown = true;
  },

  teardownModal: function () {
    if (!this.isShown) return;
    this.content.empty();
    this.isShown = false;
  }
});
