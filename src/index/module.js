import Module from '../common/module';
import Router from './router';

export default class IndexModule extends Module {
  initialize() {
    this.router = new Router(this.options);
  }
}
