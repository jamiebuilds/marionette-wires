import Route from '../../common/route';
import Model from '../model';
import View from './view';

export default class ColorsShowRoute extends Route {
  initialize(options) {
    this.container = options.container;
    this.collection = options.collection;
  }

  fetch(id) {
    if (this.collection.isNew()) {
      this.model = new Model({ id: id });
      return this.model.fetch();
    } else {
      this.model = this.collection.get(id);
    }
  }

  render() {
    this.view = new View({
      model: this.model
    });
    this.container.show(this.view);
  }
}
