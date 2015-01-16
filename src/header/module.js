import Radio from 'backbone.radio';
import Module from '../common/module';
import Collection from '../common/collection';
import View from './view';

export default class HeaderModule extends Module {
  initialize() {
    this.container = this.options.container;
    this.collection = new Collection();
    this.channel = Radio.channel('header');
    this.start();
  }

  onStart() {
    this.view = new View({ collection: this.collection });
    this.container.show(this.view);

    this.channel.comply({
      add      : this.onAdd,
      activate : this.onActivate,
      remove   : this.onRemove
    }, this);
  }

  onStop() {
    this.channel.reset();
  }

  onAdd(model) {
    this.collection.add(model);
  }

  onRemove(model) {
    model = this.collection.findWhere(model);
    this.collection.remove(model);
  }

  onActivate(model) {
    this.collection.invoke('set', 'active', false);
    model = this.collection.findWhere(model);
    if (model) {
      model.set('active', true);
    }
  }
}
