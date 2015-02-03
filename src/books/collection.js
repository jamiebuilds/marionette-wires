import Collection from '../common/collection';
import Model from './model';

export default Collection.extend({
  url: '/api/books',
  model: Model
});
