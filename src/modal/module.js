import Module from '../common/module';
import Radio from 'backbone.radio';
import Backbone from 'backbone';
import $ from 'jquery';

import LayoutView from './layout-view';

import AlertView   from './alert/view';
import ConfirmView from './confirm/view';
import PromptView  from './prompt/view';

export default class ModalModule extends Module {
  initialize() {
    this.container = this.options.container;
    this.channel = Radio.channel('modal');
    this.start();
  }

  onStart() {
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
  }

  onStop() {
    this.channel.reset();
  }

  onRoute() {
    if (this.fragment !== Backbone.history.fragment) {
      this.close();
    }
  }

  alert(options) {
    var deferred = $.Deferred();
    var view = new AlertView(options);

    view.on({
      'confirm' : deferred.resolve,
      'cancel'  : deferred.resolve
    });

    return deferred;
  }

  confirm(options) {
    var deferred = $.Deferred();
    var view = new ConfirmView(options);

    view.on({
      'confirm' : deferred.resolve,
      'cancel'  : deferred.reject
    });

    return deferred;
  }

  prompt(options) {
    var deferred = $.Deferred();
    var view = new PromptView(options);

    view.on({
      'submit' : deferred.resolve,
      'cancel' : deferred.reject
    });

    return deferred;
  }

  open(view) {
    var self = this;
    this.fragment = Backbone.history.fragment;
    return this.close().then(function() {
      self.isOpen = true;
      return self.layout.open(view);
    });
  }

  close() {
    if (this.isOpen) {
      this.isOpen = false;
      return this.layout.close();
    } else {
      return $.Deferred().resolve();
    }
  }
}
