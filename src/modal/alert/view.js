import Radio from 'backbone.radio';
import View from '../../common/view';
import Model from '../../common/model';
import template from './template.hbs';

export default class ModalAlertView extends View {
  get template() {
    return template;
  }

  initialize() {
    this.model = new Model(this.options);
    Radio.request('modal', 'open', this);
  }

  events() {
    return {
      'click .btn-primary' : 'confirm',
      'click .close'       : 'cancel'
    };
  }

  confirm() {
    Radio.request('modal', 'close').then(() => {
      this.trigger('confirm');
    });
  }

  cancel() {
    Radio.request('modal', 'close').then(() => {
      this.trigger('cancel');
    });
  }
}
