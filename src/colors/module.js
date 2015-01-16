import Radio from 'backbone.radio';
import Module from '../common/module';
import Router from './router';

export default class ColorsModule extends Module {
  initialize() {
    this.router = new Router(this.options);

    Radio.command('header', 'add', {
      name: 'Colors',
      path: 'colors',
      type: 'primary'
    });
  }
}
