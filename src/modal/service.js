import Service from 'backbone.service';
import {history} from 'backbone';
import $ from 'jquery';

import LayoutView from './layout-view';

import AlertView   from './alert/view';
import ConfirmView from './confirm/view';
import PromptView  from './prompt/view';

export default new Service({
  initialize(options) {
    this.container = options.container;
  },

  start() {
    this.layout = new LayoutView();
    this.container.show(this.layout);

    this.listenTo(history, {
      'route' : this.onRoute
    });
  },

  onRoute() {
    if (this.fragment !== history.fragment) {
      this.close();
    }
  },

  alert(options = {}) {
    options.service = this;
    var deferred = $.Deferred();
    var view = new AlertView(options);

    view.on({
      'confirm' : deferred.resolve,
      'cancel'  : deferred.resolve
    });

    return deferred;
  },

  confirm(options = {}) {
    options.service = this;
    var deferred = $.Deferred();
    var view = new ConfirmView(options);

    view.on({
      'confirm' : deferred.resolve,
      'cancel'  : deferred.reject
    });

    return deferred;
  },

  prompt(options = {}) {
    options.service = this;
    var deferred = $.Deferred();
    var view = new PromptView(options);

    view.on({
      'submit' : deferred.resolve,
      'cancel' : deferred.reject
    });

    return deferred;
  },

  open(view) {
    var self = this;
    this.fragment = history.fragment;
    return this.close().then(function() {
      self.isOpen = true;
      return self.layout.open(view);
    });
  },

  close() {
    if (this.isOpen) {
      this.isOpen = false;
      return this.layout.close();
    } else {
      return $.Deferred().resolve();
    }
  }
});
