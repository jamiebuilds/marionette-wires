var Controller = require('../classes/controller');
var Radio = require('backbone.radio');
var LayoutView = require('./layout-view');

var routerChannel = Radio.channel('router');

module.exports = Controller.extend({
  channelName: 'modal',

  initialize: function () {
    this.layout = new LayoutView();
    this.container.show(this.layout);

    this.channel.comply('open', this.openModal, this);
    this.channel.comply('destroy', this.destroyModal, this);
  },

  openModal: function (options) {
    this.layout.openModal(options);

    this.listenToOnce(routerChannel, 'route', function () {
      this.destroyModal();
    });
  },

  destroyModal: function (options) {
    this.layout.destroyModal(options);
  }
});
