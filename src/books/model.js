import Model from '../common/model';

export default Model.extend({
  urlRoot: '/api/books',
  isActive() {
    return this.collection.active === this;
  }
});
