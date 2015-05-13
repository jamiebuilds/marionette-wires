import Service from 'backbone.service';
import {Collection} from 'backbone';
import View from './view';

export default new Service({
  initialize(options) {
    this.container = options.container;
  },

  start() {
    this.collection = new Collection();
    this.view = new View({ collection: this.collection });
    this.container.show(this.view);
  },

  add(model) {
    this.collection.add(model);
  },

  remove(model) {
    model = this.collection.findWhere(model);
    this.collection.remove(model);
  },

  activate(model) {
    this.collection.invoke('set', 'active', false);
    model = this.collection.findWhere(model);
    if (model) {
      model.set('active', true);
    }
  }
});
