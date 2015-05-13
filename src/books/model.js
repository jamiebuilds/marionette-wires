import {Model} from 'backbone';

export default Model.extend({
  urlRoot: '/api/books',
  isActive() {
    return this.collection.active === this;
  }
});
