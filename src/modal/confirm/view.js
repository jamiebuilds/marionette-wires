import View from '../../common/view';
import Model from '../../common/model';
import template from './template.hbs';

export default View.extend({
  template: template,

  initialize(options) {
    this.service = options.service;
    this.model = new Model(options);
    this.service.open(this);
  },

  events: {
    'click .btn-primary' : 'confirm',
    'click .btn-default' : 'cancel',
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
