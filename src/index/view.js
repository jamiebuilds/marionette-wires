import View from '../common/view';
import template from './template.hbs';

export default class IndexView extends View {
  get template() {
    return template;
  }

  get className() {
    return 'index';
  }
}
