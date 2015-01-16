import LayoutView from '../common/layout-view';
import template from './layout-template.hbs';

export default class AppLayout extends LayoutView {
  get el() {
    return '.application';
  }

  get template() {
    return template;
  }

  regions() {
    return {
      header  : '.application__header',
      flashes : '.application__flashes',
      content : '.application__content',
      overlay : '.application__overlay'
    };
  }
}
