import {Router} from 'backbone-routing';
import HeaderService from '../header/service';

import IndexRoute from './index/route';
import CreateRoute from './create/route';
import ShowRoute from './show/route';
import EditRoute from './edit/route';

export default Router.extend({
  initialize(options = {}) {
    this.container = options.container;
    this.listenTo(this, 'before:enter', this.onBeforeEnter);

    HeaderService.request('add', {
      name: 'Colors',
      path: 'colors',
      type: 'primary'
    });
  },

  onBeforeEnter() {
    HeaderService.request('activate', {
      path: 'colors'
    });
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
