import View from '../../common/view';
import template from './template.hbs';

export default class BooksViewer extends View {
  get template() {
    return template;
  }

  get modelEvents() {
    return {
      'all': 'render'
    };
  }
}
