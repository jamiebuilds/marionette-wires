import ItemView from '../../common/item-view';
import template from './item-template.hbs';

export default class BooksLibraryItem extends ItemView {
  get template() {
    return template;
  }

  get tagName() {
    return 'a';
  }

  attributes() {
    return {
      'class' : 'list-group-item ' + (this.model.isActive() ? 'active' : ''),
      'href'  : '#books/' + this.model.get('id')
    };
  }
}
