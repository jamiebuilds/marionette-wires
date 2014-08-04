var Controller = require('../classes/controller');
var Radio = require('backbone.radio');
var Collection = require('./collection');
var CollectionView = require('./collection-view');

var channel = Radio.channel('flashes');

module.exports = Controller.extend({
  initialize: function(options) {
    this.container = options.container;
    this.collection = new Collection();
    this._showFlashesView();
    this._bindChannelCommands();
  },

  add: function(flash) {
    this.collection.add(flash);
  },

  remove: function(flash) {
    var model = this.collection.findWhere(flash);
    if (model) model.destroy();
  },

  _showFlashesView: function() {
    this.view = new CollectionView({
      collection: this.collection
    });
    this.container.show(this.view);
  },

  _bindChannelCommands: function() {
    channel.comply({
      add    : this.add,
      remove : this.remove
    }, this);
  }
});
