import Backbone from 'backbone';
import _ from 'lodash';

export default Backbone.Collection.extend({
  constructor() {
    this.cid = _.uniqueId('c');
    Backbone.Collection.apply(this, arguments);
    this._isNew = true;
    this.once('sync', () => {
      this._isNew = false;
    });
  },

  isNew() {
    return this._isNew;
  }
});
