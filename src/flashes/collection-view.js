import CollectionView from '../common/collection-view';
import ItemView from './item-view';

export default CollectionView.extend({
  childView: ItemView,
  className: 'container'
});
