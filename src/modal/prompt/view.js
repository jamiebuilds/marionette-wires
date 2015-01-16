import Radio from 'backbone.radio';
import View from '../../common/view';
import Model from '../../common/model';
import template from './template.hbs';

export default class ModalPromptView extends View {
  get template() {
    return template;
  }

  get tagName() {
    return 'form';
  }

  ui() {
    return {
      'input' : 'input'
    };
  }

  initialize() {
    this.model = new Model(this.options);
    Radio.request('modal', 'open', this);
  }

  events() {
    return {
      'submit'             : 'submit',
      'click .btn-default' : 'cancel',
      'click .close'       : 'cancel'
    };
  }

  submit(e) {
    e.preventDefault();
    var val = this.ui.input.val();
    Radio.request('modal', 'close').then(() => {
      this.trigger('submit', val);
    });
  }

  cancel() {
    Radio.request('modal', 'close').then(() => {
      this.trigger('cancel');
    });
  }
}
