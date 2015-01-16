import Backbone from 'backbone';
import Radio from 'backbone.radio';

export default class Model extends Backbone.Model {
  constructor() {
    super(...arguments);
    this.on('request', this.handleRequest);
    this.on('error', this.handleError);
  }

  handleRequest() {
    Radio.command('flashes', 'remove', this.serverError);
    delete this.serverError;
  }

  handleError() {
    this.serverError = { type: 'danger', title: 'Server Error' };
    Radio.command('flashes', 'add', this.serverError);
  }

  cleanup() {
    if (this.serverError) {
      Radio.command('flashes', 'remove', this.serverError);
    }
    delete this.serverError;
    delete this.validationError;
  }
}
