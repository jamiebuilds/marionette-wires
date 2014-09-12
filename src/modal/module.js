var Backbone = require('backbone');
var Module = require('src/common/module');
var Radio = require('backbone.radio');
var LayoutView = require('./layout-view');

var modalChannel = Radio.channel('modal');

module.exports = Module.extend({
  initialize: function () {
    this.container = this.options.container;
    this.start();
  },

  onStart: function() {
    this.layout = new LayoutView();
    this.container.show(this.layout);
    modalChannel.comply({
      'open'    : this.openModal,
      'destroy' : this.destroyModal
    }, this);
  },

  onStop: function() {
    modalChannel.reset();
  },

  openModal: function (options) {
    this.layout.openModal(options);
    this.originalFragment = Backbone.history.fragment;
    this.listenToOnce(Backbone.history, 'route', function () {
      if (Backbone.history.fragment != this.originalFragment) {
        this.destroyModal();
      }
    });
  },

  destroyModal: function (options) {
    this.layout.destroyModal(options);
  },

  onRoute: function() {
    if (Backbone.history.fragment != this.originalFragment) {
      this.destroyModal();
      delete this.originalFragment;
    }
  }
});
