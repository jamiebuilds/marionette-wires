import Collection from '../common/collection';
import Model from './model';

export default class BooksCollection extends Collection {
  get url() {
    return '/api/books';
  }

  get model() {
    return Model;
  }
}
