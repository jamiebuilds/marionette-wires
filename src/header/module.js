var Radio = require('backbone.radio');
var Module = require('src/common/module');
var Collection = require('src/common/collection');
var View = require('./view');

module.exports = Module.extend({
  initialize: function() {
    this.container = this.options.container;
    this.collection = new Collection();
    this.start();
  },

  onStart: function() {
    this.view = new View({ collection: this.collection });
    this.container.show(this.view);

    Radio.comply('header', {
      add      : this.onAdd,
      remove   : this.onRemove
    }, this);
  },

  onStop: function() {
    Radio.stopComplying('header');
  },

  onAdd: function(model) {
    this.collection.add(model);
  },

  onRemove: function(model) {
    model = this.collection.findWhere(model);
    this.collection.remove(model);
  }
});
