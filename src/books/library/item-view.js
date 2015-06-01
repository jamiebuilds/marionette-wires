import {ItemView} from 'backbone.marionette';
import template from './item-template.hbs';

export default ItemView.extend({
  template: template,
  tagName: 'a',

  attributes() {
    return {
      class : `list-group-item ${(this.model.isActive() ? 'active' : '')}`,
      href  : `#books/${this.model.get('id')}`
    };
  }
});
