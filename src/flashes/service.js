import Service from '../common/service';
import Collection from './collection';
import CollectionView from './collection-view';

export default class FlashesService extends Service {
  get channelName() {
    return 'flashes';
  }

  initialize(options) {
    this.container = options.container;
    this.collection = new Collection();
    this.start();
  }

  onStart() {
    this._showFlashesView();
    this._bindChannelCommands();
  }

  onStop() {
    this.channel.stopComplying();
  }

  add(flash) {
    this.collection.add(flash);
  }

  remove(flash) {
    var model = this.collection.findWhere(flash);
    if (model) {
      model.destroy();
    }
  }

  _showFlashesView() {
    this.view = new CollectionView({
      collection: this.collection
    });
    this.container.show(this.view);
  }

  _bindChannelCommands() {
    this.channel.comply({
      add    : this.add,
      remove : this.remove
    }, this);
  }
}
