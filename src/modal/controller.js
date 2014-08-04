var Controller = require('../classes/controller');
var Radio = require('backbone.radio');
var LayoutView = require('./layout-view');

var modalChannel = Radio.channel('modal');
var routerChannel = Radio.channel('router');

module.exports = Controller.extend({
  initialize: function (options) {
    this.container = options.container;
    this._showLayoutView();
    this._bindChannelCommands();
  },

  openModal: function (options) {
    this.layout.openModal(options);
    this.listenToOnce(routerChannel, 'route', function () {
      this.destroyModal();
    });
  },

  destroyModal: function (options) {
    this.layout.destroyModal(options);
  },

  _showLayoutView: function() {
    this.layout = new LayoutView();
    this.container.show(this.layout);
  },

  _bindChannelCommands: function() {
    modalChannel.comply('open', this.openModal, this);
    modalChannel.comply('destroy', this.destroyModal, this);
  }
});
