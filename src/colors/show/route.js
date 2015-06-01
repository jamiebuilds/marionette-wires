import {Route} from 'backbone-routing';
import View from './view';
import storage from '../storage';

export default Route.extend({
  initialize(options = {}) {
    this.container = options.container;
  },

  fetch(id) {
    return storage.find(id).then(model => {
      this.model = model;
    });
  },

  render() {
    this.view = new View({
      model: this.model
    });
    this.container.show(this.view);
  }
});
