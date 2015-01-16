import Router from '../common/router';
import Radio from 'backbone.radio';

import Collection from './collection';
import IndexRoute from './index/route';
import CreateRoute from './create/route';
import ShowRoute from './show/route';
import EditRoute from './edit/route';

export default class ColorsRouter extends Router {
  initialize(options) {
    this.container = options.container;
    this.collection = new Collection();

    Radio.command('header', 'add', {
      name: 'Colors',
      path: 'colors',
      type: 'primary'
    });
  }

  onBeforeEnter() {
    Radio.command('header', 'activate', { path: 'colors' });
  }

  get routes() {
    return {
      'colors'          : 'index',
      'colors/new'      : 'create',
      'colors/:id'      : 'show',
      'colors/:id/edit' : 'edit'
    };
  }

  index() {
    return new IndexRoute({
      container  : this.container,
      collection : this.collection
    });
  }

  create() {
    return new CreateRoute({
      container  : this.container,
      collection : this.collection
    });
  }

  show() {
    return new ShowRoute({
      container  : this.container,
      collection : this.collection
    });
  }

  edit() {
    return new EditRoute({
      container  : this.container,
      collection : this.collection
    });
  }
}
