import Service from '../common/service';
import Collection from '../common/collection';
import View from './view';

export default class HeaderService extends Service {
  get channelName() {
    return 'header';
  }

  initialize(options) {
    this.container = options.container;
    this.collection = new Collection();
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
