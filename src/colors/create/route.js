import Route from '../../common/route';
import Model from '../model';
import View from './view';

import storage from '../storage';

export default class ColorsCreateRoute extends Route {
  initialize(options) {
    this.container = options.container;
  }

  fetch() {
    this.model = new Model();
    return storage.findAll().then(collection => {
      this.collection = collection;
    });
  }

  render() {
    this.view = new View({
      collection: this.collection,
      model: this.model
    });
    this.container.show(this.view);
  }
}
