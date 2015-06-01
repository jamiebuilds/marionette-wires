import {ItemView} from 'backbone.marionette';
import {Model} from 'backbone';
import template from './template.hbs';

export default ItemView.extend({
  template: template,
  tagName: 'form',

  ui: {
    input: 'input'
  },

  initialize(options = {}) {
    this.model = new Model(options);
  },

  triggers: {
    'click .btn-default' : 'cancel',
    'click .close'       : 'cancel'
  },

  events: {
    submit: 'submit'
  },

  submit(e) {
    e.preventDefault();
    var val = this.ui.input.val();
    this.trigger('submit', val);
  }
});
