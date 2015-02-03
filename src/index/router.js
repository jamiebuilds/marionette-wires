import Router from '../common/router';
import Radio from 'backbone.radio';
import IndexRoute from './route';

export default Router.extend({
  initialize(options) {
    this.container = options.container;
  },

  onBeforeEnter() {
    Radio.command('header', 'activate', { path: '' });
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
