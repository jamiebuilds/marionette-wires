import Collection from '../common/collection';
import Model from './model';

export default class FlashesCollection extends Collection {
  get model() {
    return Model;
  }
}
