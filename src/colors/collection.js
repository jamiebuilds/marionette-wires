import Collection from '../common/collection';
import Model from './model';

export default class ColorsCollection extends Collection {
  get url() {
    return '/api/colors';
  }

  get model() {
    return Model;
  }
}
