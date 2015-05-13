import View from '../../common/view';
import Model from '../../common/model';
import template from './template.hbs';

export default View.extend({
  template: template,
  tagName: 'form',

  ui: {
    'input' : 'input'
  },

  initialize(options) {
    this.service = options.service;
    this.model = new Model(options);
    this.service.open(this);
  },

  events: {
    'submit'             : 'submit',
    'click .btn-default' : 'cancel',
    'click .close'       : 'cancel'
  },

  submit(e) {
    e.preventDefault();
    var val = this.ui.input.val();
    this.service.close().then(() => {
      this.trigger('submit', val);
    });
  },

  cancel() {
    this.service.close().then(() => {
      this.trigger('cancel');
    });
  }
});
