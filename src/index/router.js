import Router from '../common/router';
import Radio from 'backbone.radio';
import IndexRoute from './route';

export default class IndexRouter extends Router {
  initialize(options) {
    this.container = options.container;
  }

  onBeforeEnter() {
    Radio.command('header', 'activate', { path: '' });
  }

  get routes() {
    return {
      '': 'index'
    };
  }

  index() {
    return new IndexRoute({
      container: this.container
    });
  }
}
