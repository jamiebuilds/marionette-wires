import Router from '../common/router';
import Radio from 'backbone.radio';
import LayoutView from './layout-view';
import IndexRoute from './index/route';
import ShowRoute from './show/route';

export default Router.extend({
  initialize(options) {
    this.container = options.container;

    Radio.command('header', 'add', {
      name: 'Books',
      path: 'books',
      type: 'primary'
    });
  },

  onBeforeEnter() {
    this.layout = new LayoutView();
    this.container.show(this.layout);
    Radio.command('header', 'activate', { path: 'books' });
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
