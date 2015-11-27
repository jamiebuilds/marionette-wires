import {Route} from 'backbone-routing';
import LibraryView from '../library/collection-view';
import ViewerView from '../viewer/view';
import storage from '../storage';

export default Route.extend({
  initialize(options = {}) {
    this.layout = options.layout;
    this.listenTo(this, 'fetch', this.onFetch);
  },

  fetch(id) {
    return storage.findAll().then(collection => {
      this.collection = collection;
      this.model = this.collection.get(id);
      this.collection.active = this.model;
    });
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
