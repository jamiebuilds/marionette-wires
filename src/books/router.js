import {Router} from 'backbone-routing';
import HeaderService from '../header/service';
import LayoutView from './layout-view';
import IndexRoute from './index/route';
import ShowRoute from './show/route';

export default Router.extend({
  initialize(options = {}) {
    this.container = options.container;
    this.listenTo(this, 'before:enter', this.onBeforeEnter);

    HeaderService.request('add', {
      name: 'Books',
      path: 'books',
      type: 'primary'
    });
  },

  onBeforeEnter() {
    this.layout = new LayoutView();
    this.container.show(this.layout);
    HeaderService.request('activate', {
      path: 'books'
    });
  },

  routes: {
    'books'     : 'index',
    'books/:id' : 'show'
  },

  index() {
    return new IndexRoute();
  },

  show() {
    return new ShowRoute({
      layout: this.layout
    });
  }
});
