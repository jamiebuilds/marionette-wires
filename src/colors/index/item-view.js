import ItemView from '../../common/item-view';
import template from './item-template.hbs';

export default class ColorsIndexItemView extends ItemView {
  get tagName() {
    return 'a';
  }

  get template() {
    return template;
  }

  get className() {
    return 'colors__item list-group-item';
  }

  attributes() {
    return {
      href: '#colors/' + this.model.get('id')
    };
  }

  get modelEvents() {
    return {
      'all': 'render'
    };
  }
}
