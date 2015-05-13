import {CollectionView} from 'backbone.marionette';
import ItemView from './item-view';

export default CollectionView.extend({
  childView: ItemView,
  className: 'container'
});
