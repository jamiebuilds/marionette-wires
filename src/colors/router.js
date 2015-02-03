import Router from '../common/router';
import Radio from 'backbone.radio';

import IndexRoute from './index/route';
import CreateRoute from './create/route';
import ShowRoute from './show/route';
import EditRoute from './edit/route';

export default Router.extend({
  initialize(options) {
    this.container = options.container;

    Radio.command('header', 'add', {
      name: 'Colors',
      path: 'colors',
      type: 'primary'
    });
  },

  onBeforeEnter() {
    Radio.command('header', 'activate', { path: 'colors' });
  },

  routes: {
    'colors'          : 'index',
    'colors/new'      : 'create',
    'colors/:id'      : 'show',
    'colors/:id/edit' : 'edit'
  },

  index() {
    return new IndexRoute({
      container: this.container
    });
  },

  create() {
    return new CreateRoute({
      container: this.container
    });
  },

  show() {
    return new ShowRoute({
      container: this.container
    });
  },

  edit() {
    return new EditRoute({
      container: this.container
    });
  }
});
