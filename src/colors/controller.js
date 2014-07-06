var Controller = require('../classes/controller');

var Router = require('./router');
var Model = require('./model');
var Collection = require('./collection');

var IndexView  = require('./index/composite-view');
var CreateView = require('./create/view');
var ShowView   = require('./show/view');
var EditView   = require('./edit/view');

module.exports = Controller.extend({
  initialize: function (options) {
    this.container = options.container;
    this.router = new Router({ controller: this });

    this.collection = new Collection();
    this.collection.fetch();
  },

  index: function () {
    var indexView = new IndexView({
      collection: this.collection
    });

    this.container.show(indexView);
  },

  create: function () {
    var model = new Model();

    var createView = new CreateView({
      collection: this.collection,
      model: model
    });

    this.container.show(createView);
  },

  show: function (id) {
    var model = this._getModel(id);

    var showView = new ShowView({
      model: model
    });

    this.container.show(showView);
  },

  edit: function (id) {
    var model = this._getModel(id);

    var editView = new EditView({
      model: model
    });

    this.container.show(editView);
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
