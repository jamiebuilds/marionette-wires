import CollectionView from '../common/collection-view';
import ItemView from './item-view';

export default class FlashesView extends CollectionView {
  get childView() {
    return ItemView;
  }

  get className() {
    return 'container';
  }
}
