var Radio = require('backbone.radio');
var Controller = require('../classes/controller');
var Router = require('./router');
var LayoutView = require('./layout-view');

var Model = require('./model');
var Collection = require('./collection');

var LibraryController = require('./library/controller');
var ViewerController = require('./viewer/controller');

var channel = Radio.channel('books');

module.exports = Controller.extend({
  initialize: function(options) {
    this.container = options.container;
    this.router = new Router({ controller: this });
  },

  start: function() {
    this.collection = new Collection();
    this.collection.fetch();

    this.layout = new LayoutView();
    this.container.show(this.layout);

    this.library = new LibraryController({
      container: this.layout.library,
      collection: this.collection
    });

    this.viewer = new ViewerController({
      container: this.layout.viewer
    });
  },

  index: function() {
    this.start();
    var model = this._getModel(1);
    channel.trigger('select', model);
  },

  show: function(id) {
    this.start();
    var model = this._getModel(id);
    channel.trigger('select', model);
  },

  _getModel: function(id) {
    var model = this.collection.get(id);

    if (!model) {
      model = new Model({ id: id });
      model.fetch();
      this.collection.add(model, { merge: true, silent: true });
    }

    return model;
  }
});
