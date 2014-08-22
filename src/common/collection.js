var Backbone = require('backbone');

module.exports = Backbone.Collection.extend({
  constructor: function() {
    Backbone.Collection.apply(this, arguments);
    this._isNew = true;
    this.once('sync', function() {
      this._isNew = false;
    });
  },

  isNew: function() {
    return this._isNew;
  }
});
