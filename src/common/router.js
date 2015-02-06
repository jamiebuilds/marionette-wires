import Marionette from 'backbone.marionette';
import Backbone from 'backbone';
import $ from 'jquery';
import Radio from 'backbone.radio';
import Route from './route';

export default Marionette.AppRouter.extend({
  constructor() {
    this.channel = Radio.channel('router');
    this.on('all', this._onRouterEvent);
    this.listenTo(Backbone.history, 'route', this._onHistoryRoute);
    Marionette.AppRouter.apply(this, arguments);
  },

  _onRouterEvent(name, ...args) {
    this.channel.trigger(name, this, ...args);
  },

  _onHistoryRoute(router) {
    if (this === router) {
      this.active = true;
    } else {
      this.active = false;
    }
  },

  execute(callback, args) {
    if (!this.active) {
      this.triggerMethod('before:enter', ...args);
    }

    this.triggerMethod('before:route', ...args);

    $.when(this._execute(callback, args)).then(() => {
      if (!this.active) {
        this.triggerMethod('enter', ...args);
      }
      this.triggerMethod('route', ...args);
    });
  },

  _execute(callback, args) {
    var route = callback.apply(this, args);

    if (route instanceof Route) {
      route.router = this;
      return route.enter(args);
    }
  },

  triggerMethod: Marionette.triggerMethod
});
