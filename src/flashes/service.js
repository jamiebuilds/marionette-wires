import Service from 'backbone.service';
import Collection from './collection';
import CollectionView from './collection-view';

export default new Service({
  initialize(options) {
    this.container = options.container;
  },

  start() {
    this.collection = new Collection();
    this.view = new CollectionView({
      collection: this.collection
    });
    this.container.show(this.view);
  },

  add(flash) {
    this.collection.add(flash);
  },

  remove(flash) {
    var model = this.collection.findWhere(flash);
    if (model) {
      model.destroy();
    }
  }
});
