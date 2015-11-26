import {LayoutView} from 'backbone.marionette';
import template from './layout-template.hbs';

export default LayoutView.extend({
  template: template,
  className: 'modal fade',

  attributes: {
    'tabindex' : -1,
    'role' : 'dialog'
  },

  regions: {
    content: '.modal-content'
  },

  triggers: {
    'shown.bs.modal'  : 'modal:show',
    'hidden.bs.modal' : 'modal:hide',
  },

  onShow() {
    this.$el.modal({
      show: false,
      backdrop: 'static'
    });
  },

  animateIn() {
    return new Promise(resolve => {
      this.once('modal:show', resolve);
      this.$el.modal('show');
    });
  },

  animateOut() {
    return new Promise(resolve => {
      this.once('modal:hide', resolve);
      this.$el.modal('hide');
    });
  }
});
