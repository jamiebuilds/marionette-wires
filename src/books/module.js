import Radio from 'backbone.radio';
import Module from '../common/module';
import Router from './router';

export default class BooksModule extends Module {
  initialize() {
    this.router = new Router(this.options);

    Radio.command('header', 'add', {
      name: 'Books',
      path: 'books',
      type: 'primary'
    });
  }
}
