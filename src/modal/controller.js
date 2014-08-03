var Controller = require('../classes/controller');
var Radio = require('backbone.radio');
var LayoutView = require('./layout-view');

var modalChannel = Radio.channel('modal');
var routerChannel = Radio.channel('router');

module.exports = Controller.extend({
  initialize: function () {
    this.layout = new LayoutView();
    this.container.show(this.layout);

    modalChannel.comply('open', this.openModal, this);
    modalChannel.comply('destroy', this.destroyModal, this);
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
