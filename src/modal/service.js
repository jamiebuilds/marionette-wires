import Service from 'backbone.service';
import {history} from 'backbone';

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
    var view = new AlertView(options);

    return new Promise(resolve => {
      view.on('confirm cancel', resolve);
    });
  },

  confirm(options = {}) {
    options.service = this;
    var view = new ConfirmView(options);

    return new Promise((resolve, reject) => {
      view.on({
        'confirm' : resolve,
        'cancel'  : reject
      });
    });
  },

  prompt(options = {}) {
    options.service = this;
    var view = new PromptView(options);

    return new Promise((resolve, reject) => {
      view.on({
        'submit' : resolve,
        'cancel' : reject
      });
    });
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
      return Promise.resolve();
    }
  }
});
