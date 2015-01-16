import Route from '../../common/route';
import LibraryView from '../library/collection-view';
import ViewerView from '../viewer/view';

export default class BooksShowRoute extends Route {
  initialize(options) {
    this.layout = options.layout;
    this.collection = options.collection;
  }

  fetch() {
    if (this.collection.isNew()) {
      return this.collection.fetch();
    }
  }

  onFetch(id) {
    this.model = this.collection.get(id);
    this.collection.active = this.model;
  }

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
}
