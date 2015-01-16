import Module from '../common/module';
import Radio from 'backbone.radio';
import Collection from './collection';
import CollectionView from './collection-view';

export default class FlashesModule extends Module {
  initialize() {
    this.container = this.options.container;
    this.channel = Radio.channel('flashes');
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
