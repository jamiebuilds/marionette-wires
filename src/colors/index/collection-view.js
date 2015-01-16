import CollectionView from '../../common/collection-view';
import ItemView from './item-view';

export default class ColorsIndexView extends CollectionView {
  get className() {
    return 'list-group';
  }

  get childView() {
    return ItemView;
  }
}
