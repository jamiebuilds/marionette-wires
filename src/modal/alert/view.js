import {ItemView} from 'backbone.marionette';
import {Model} from 'backbone';
import template from './template.hbs';

export default ItemView.extend({
  template: template,

  initialize(options) {
    this.service = options.service;
    this.model = new Model(options);
    this.service.open(this);
  },

  events: {
    'click .btn-primary' : 'confirm',
    'click .close'       : 'cancel'
  },

  confirm() {
    this.service.close().then(() => {
      this.trigger('confirm');
    });
  },

  cancel() {
    this.service.close().then(() => {
      this.trigger('cancel');
    });
  }
});
