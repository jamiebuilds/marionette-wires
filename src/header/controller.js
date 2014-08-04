var Radio = require('backbone.radio');
var Controller = require('../classes/controller');
var Collection = require('../classes/collection');
var View = require('./view');

module.exports = Controller.extend({
  initialize: function (options) {
    this.container = options.container;
    this.collection = new Collection();
    this._showHeaderView();
    this._bindChannelCommands();
  },

  addNavitem: function(name, path) {
    this.collection.add({ name: name, path: path });
  },

  _showHeaderView: function() {
    this.view = new View({ collection: this.collection });
    this.container.show(this.view);
  },

  _bindChannelCommands: function() {
    Radio.comply('header', 'add', this.addNavitem, this);
  }
});
