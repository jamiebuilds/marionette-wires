var Module = require('src/common/module');
var Radio = require('backbone.radio');
var Backbone = require('backbone');
var $ = require('jquery');

var LayoutView = require('./layout-view');

var AlertView   = require('./alert/view');
var ConfirmView = require('./confirm/view');
var PromptView  = require('./prompt/view');

module.exports = Module.extend({
  initialize: function() {
    this.container = this.options.container;
    this.channel = Radio.channel('modal');
    this.start();
  },

  onStart: function() {
    this.layout = new LayoutView();
    this.container.show(this.layout);

    this.channel.reply({
      'open'    : this.open,
      'close'   : this.close,
      'alert'   : this.alert,
      'confirm' : this.confirm,
      'prompt'  : this.prompt
    }, this);

    this.listenTo(Backbone.history, {
      'route' : this.onRoute
    });
  },

  onStop: function() {
    this.channel.reset();
  },

  onRoute: function() {
    if (this.fragment !== Backbone.history.fragment) {
      this.close();
    }
  },

  alert: function(options) {
    var deferred = $.Deferred();
    var view = new AlertView(options);

    view.on({
      'confirm' : deferred.resolve,
      'cancel'  : deferred.resolve,
      'destroy' : deferred.resolve
    });

    return deferred;
  },

  confirm: function(options) {
    var deferred = $.Deferred();
    var view = new ConfirmView(options);

    view.on({
      'confirm' : deferred.resolve,
      'cancel'  : deferred.reject,
      'destroy' : deferred.reject
    });

    return deferred;
  },

  prompt: function(options) {
    var deferred = $.Deferred();
    var view = new PromptView(options);

    view.on({
      'submit'  : deferred.resolve,
      'cancel'  : deferred.reject,
      'destroy' : deferred.reject
    });

    return deferred;
  },

  open: function(view) {
    var self = this;
    this.fragment = Backbone.history.fragment;
    return this.close().then(function() {
      self.isOpen = true;
      return self.layout.open(view);
    });
  },

  close: function() {
    if (this.isOpen) {
      this.isOpen = false;
      return this.layout.close();
    } else {
      return $.Deferred().resolve();
    }
  }
});
