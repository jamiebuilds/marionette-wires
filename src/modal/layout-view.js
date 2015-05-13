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

  initialize() {
    this.$el.modal({ show: false, backdrop: 'static' });
  },

  triggers: {
    'show.bs.modal'   : { preventDefault: false, event: 'before:open' },
    'shown.bs.modal'  : { preventDefault: false, event: 'open' },
    'hide.bs.modal'   : { preventDefault: false, event: 'before:close' },
    'hidden.bs.modal' : { preventDefault: false, event: 'close' }
  },

  open(view) {
    return new Promise(resolve => {
      this.once('open', resolve);
      this.content.show(view);
      this.$el.modal('show');
    });
  },

  close() {
    return new Promise(resolve => {
      this.once('close', () => {
        this.content.empty();
        resolve();
      });
      this.$el.modal('hide');
    });
  }
});
