import Router from '../common/router';
import HeaderService from '../header/service';
import IndexRoute from './route';

export default Router.extend({
  initialize(options) {
    this.container = options.container;
  },

  onBeforeEnter() {
    HeaderService.command('activate', {
      path: ''
    });
  },

  routes: {
    '': 'index'
  },

  index() {
    return new IndexRoute({
      container: this.container
    });
  }
});
