import Backbone from 'backbone';

export default class Collection extends Backbone.Collection {
  constructor() {
    super(...arguments);
    this._isNew = true;
    this.once('sync', () => {
      this._isNew = false;
    });
  }

  isNew() {
    return this._isNew;
  }
}
