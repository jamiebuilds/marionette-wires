import Route from '../../common/route';
import View from './composite-view';

export default class ColorsIndexRoute extends Route {
  initialize(options) {
    this.container = options.container;
    this.collection = options.collection;
  }

  fetch() {
    if (this.collection.isNew()) {
      return this.collection.fetch();
    }
  }

  render(params) {
    var page = params && parseFloat(params.page) || 1;

    this.view = new View({
      collection: this.collection,
      page: page
    });

    this.container.show(this.view);
  }
}
