import Radio from 'backbone.radio';
import View from '../../common/view';
import Model from '../../common/model';
import template from './template.hbs';

export default View.extend({
  template: template,

  initialize() {
    this.model = new Model(this.options);
    Radio.request('modal', 'open', this);
  },

  events: {
    'click .btn-primary' : 'confirm',
    'click .close'       : 'cancel'
  },

  confirm() {
    Radio.request('modal', 'close').then(() => {
      this.trigger('confirm');
    });
  },

  cancel() {
    Radio.request('modal', 'close').then(() => {
      this.trigger('cancel');
    });
  }
});
