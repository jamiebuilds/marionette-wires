import CollectionView from '../../common/collection-view';
import ItemView from './item-view';

export default CollectionView.extend({
  className: 'list-group',
  childView: ItemView,
});
