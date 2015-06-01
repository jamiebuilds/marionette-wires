import {Route} from 'backbone-routing';
import LibraryView from '../library/collection-view';
import ViewerView from '../viewer/view';
import storage from '../storage';

export default Route.extend({
  initialize(options = {}) {
    this.layout = options.layout;
  },

  fetch() {
    return storage.findAll().then(collection => {
      this.collection = collection;
    });
  },

  onFetch(id) {
    this.model = this.collection.get(id);
    this.collection.active = this.model;
  },

  render() {
    this.library = new LibraryView({
      collection: this.collection
    });

    this.viewer = new ViewerView({
      model: this.model
    });

    this.layout.library.show(this.library);
    this.layout.viewer.show(this.viewer);
  }
});
