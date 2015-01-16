import Route from '../../common/route';
import Model from '../model';
import View from './view';

export default class ColorsCreateRoute extends Route {
  initialize(options) {
    this.container = options.container;
    this.collection = options.collection;
  }

  fetch() {
    if (this.collection.isNew()) {
      return this.collection.fetch();
    }
  }

  render() {
    this.model = new Model();
    this.view = new View({
      collection: this.collection,
      model: this.model
    });
    this.container.show(this.view);
  }
}
