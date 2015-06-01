import {Route} from 'backbone-routing';
import Model from '../model';
import View from './view';
import storage from '../storage';

export default Route.extend({
  initialize(options = {}) {
    this.container = options.container;
  },

  fetch() {
    this.model = new Model();
    return storage.findAll().then(collection => {
      this.collection = collection;
    });
  },

  render() {
    this.view = new View({
      collection: this.collection,
      model: this.model
    });
    this.container.show(this.view);
  }
});
