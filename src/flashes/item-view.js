import {ItemView} from 'backbone.marionette';
import template from './item-template.hbs';

export default ItemView.extend({
  template: template,

  className() {
    return `flashes__alert alert alert-${this.model.get('type')}`;
  },

  attributes: {
    role: 'alert'
  },

  events: {
    'click button.close': 'dismiss'
  },

  dismiss() {
    this.model.destroy();
  }
});
