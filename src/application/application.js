var $ = require('jquery');
var Radio = require('backbone.radio');
var nprogress = require('nprogress');
var Application = require('src/common/application');
var LayoutView = require('./layout-view');

var routerChannel = Radio.channel('router');

nprogress.configure({
  showSpinner: false
});

module.exports = Application.extend({
  initialize: function() {
    this.$body = $(document.body);
    this.layout = new LayoutView();
    this.layout.render();

    this.listenTo(routerChannel, {
      'before:enter:route' : this.onBeforeEnterRoute,
      'enter:route'        : this.onEnterRoute,
      'error:route'        : this.onErrorRoute
    });
  },

  onBeforeEnterRoute: function() {
    nprogress.start();
  },

  onEnterRoute: function() {
    this.$body.scrollTop(0);
    nprogress.done();
  },

  onErrorRoute: function() {
    nprogress.done(true);
  }
});
