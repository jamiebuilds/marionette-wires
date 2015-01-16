import Marionette from 'backbone.marionette';
import Backbone from 'backbone';

export default Marionette.Module.extend({
  constructor() {
    this.listenTo(Backbone.history, 'route', this._onHistoryRoute);
    Marionette.Module.apply(this, arguments);
  },

  initialize() {},

  _onHistoryRoute(router) {
    if (!this.router) {
      return;
    }

    if (this.router && this.router === router) {
      this.start();
    } else {
      this.stop();
    }
  }
});
