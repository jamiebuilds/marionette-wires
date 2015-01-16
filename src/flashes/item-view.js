import ItemView from '../common/item-view';
import template from './item-template.hbs';

export default class FlashesItemView extends ItemView {
  get template() {
    return template;
  }

  className() {
    return 'flashes__alert alert alert-' + this.model.get('type');
  }

  get attributes() {
    return {
      role: 'alert'
    };
  }

  events() {
    return {
      'click button.close' : 'dismiss'
    };
  }

  dismiss() {
    this.model.destroy();
  }
}
