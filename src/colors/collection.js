import Collection from '../common/collection';
import Model from './model';

export default Collection.extend({
  url: '/api/colors',
  model: Model
});
