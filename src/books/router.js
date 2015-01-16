import Router from '../common/router';
import Radio from 'backbone.radio';

import LayoutView from './layout-view';
import Collection from './collection';

import IndexRoute from './index/route';
import ShowRoute from './show/route';

export default class BooksRouter extends Router {
  initialize(options) {
    this.container = options.container;
    this.collection = new Collection();

    Radio.command('header', 'add', {
      name: 'Books',
      path: 'books',
      type: 'primary'
    });
  }

  onBeforeEnter() {
    this.layout = new LayoutView();
    this.container.show(this.layout);
    Radio.command('header', 'activate', { path: 'books' });
  }

  get routes() {
    return {
      'books'     : 'index',
      'books/:id' : 'show'
    };
  }

  index() {
    return new IndexRoute({
      collection: this.collection
    });
  }

  show() {
    return new ShowRoute({
      collection : this.collection,
      layout     : this.layout
    });
  }
}
