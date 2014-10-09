var Module = require('src/common/module');
var Radio = require('backbone.radio');
var Collection = require('./collection');
var CollectionView = require('./collection-view');

module.exports = Module.extend({
  initialize: function() {
    this.container = this.options.container;
    this.channel = Radio.channel('flashes');
    this.collection = new Collection();
    this.start();
  },

  onStart: function() {
    this._showFlashesView();
    this._bindChannelCommands();
  },

  onStop: function() {
    this.channel.stopComplying();
  },

  add: function(flash) {
    this.collection.add(flash);
  },

  remove: function(flash) {
    var model = this.collection.findWhere(flash);
    if (model) {
      model.destroy();
    }
  },

  _showFlashesView: function() {
    this.view = new CollectionView({
      collection: this.collection
    });
    this.container.show(this.view);
  },

  _bindChannelCommands: function() {
    this.channel.comply({
      add    : this.add,
      remove : this.remove
    }, this);
  }
});
