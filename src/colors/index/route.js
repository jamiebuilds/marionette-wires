import Route from '../../common/route';
import LayoutView from './layout-view';

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

    this.layoutView = new LayoutView({
      collection: this.collection,
      page: page
    });

    this.container.show(this.layoutView);
  }
}
