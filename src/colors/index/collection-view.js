import {CollectionView} from 'backbone.marionette';
import ItemView from './item-view';

export default CollectionView.extend({
  className: 'list-group',
  childView: ItemView,
});
