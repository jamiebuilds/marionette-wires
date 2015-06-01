import {ItemView} from 'backbone.marionette';
import template from './template.hbs';

export default ItemView.extend({
  template: template,
  modelEvents: {
    all: 'render'
  }
});
