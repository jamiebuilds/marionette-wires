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
    var self = this;
    this.transitioning = true;
    // Don't show for synchronous route changes
    setTimeout(function() {
      if (self.transitioning) {
        nprogress.start();
      }
    }, 0);
  },

  onEnterRoute: function() {
    this.transitioning = false;
    this.$body.scrollTop(0);
    nprogress.done();
  },

  onErrorRoute: function() {
    this.transitioning = false;
    nprogress.done(true);
  }
});
