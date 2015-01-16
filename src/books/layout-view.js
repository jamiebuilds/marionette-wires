import LayoutView from '../common/layout-view';
import template from './layout-template.hbs';

export default class BooksLayout extends LayoutView {
  get template() {
    return template;
  }

  get className() {
    return 'container';
  }

  regions() {
    return {
      library : '.books__library',
      viewer  : '.books__viewer'
    };
  }
}
