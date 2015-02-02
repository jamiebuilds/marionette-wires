import Backbone from 'backbone';
import _ from 'lodash';

export default class Collection extends Backbone.Collection {
  constructor() {
    this.cid = _.uniqueId('c');
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
