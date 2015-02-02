import Marionette from 'backbone.marionette';
import Backbone from 'backbone';

export default class Route extends Marionette.Object {
  constructor() {
    this.initialize(...arguments);
  }

  _triggerMethod(name, args) {
    if (this.router) {
      this.router.triggerMethod(name + ':route', ...args);
    }
    this.triggerMethod(name, ...args);
  }

  enter(args) {
    this._triggerMethod('before:enter', args);
    this._triggerMethod('before:fetch', args);

    return Promise.resolve(this.fetch(...args))
      .then(() => {
        this._triggerMethod('fetch', args);
        this._triggerMethod('before:render', args);
      })
      .then(() => this.render(...args))
      .then(() => {
        this._triggerMethod('render', args);
        this._triggerMethod('enter', args);
      })
      .catch(() => {
        this._triggerMethod('error', args);
      });
  }

  navigate() {
    Backbone.history.navigate(...arguments);
  }

  fetch() {}
  render() {}
}
