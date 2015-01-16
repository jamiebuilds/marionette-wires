import Model from '../common/model';

export default class BooksModel extends Model {
  get urlRoot() {
    return '/api/books';
  }

  isActive() {
    return this.collection.active === this;
  }
}
