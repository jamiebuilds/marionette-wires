import Storage from '../common/storage';
import Model from './model';
import Collection from './collection';

class ColorsStorage extends Storage {
  get model() {
    return Model;
  }

  get collection() {
    return Collection;
  }
}

export default new ColorsStorage();
