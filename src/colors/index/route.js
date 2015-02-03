import Route from '../../common/route';
import LayoutView from './layout-view';
import storage from '../storage';

export default Route.extend({
  initialize(options) {
    this.container = options.container;
  },

  fetch() {
    return storage.findAll().then(collection => {
      this.collection = collection;
    });
  },

  render(params) {
    var page = params && parseFloat(params.page) || 1;

    this.layoutView = new LayoutView({
      collection: this.collection,
      page: page
    });

    this.container.show(this.layoutView);
  }
});
