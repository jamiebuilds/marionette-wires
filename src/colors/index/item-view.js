import {ItemView} from 'backbone.marionette';
import template from './item-template.hbs';

export default ItemView.extend({
  tagName: 'a',
  template: template,
  className: 'colors__item list-group-item',

  attributes() {
    return {
      href: `#colors/${this.model.get('id')}`
    };
  },

  modelEvents: {
    all: 'render'
  }
});
