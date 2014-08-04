var $ = require('jquery');
var Radio = require('backbone.radio');
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
    Radio.command('header', 'add', 'Colors', 'colors');
  },

  index: function () {
    var self = this;
    return this._getCollection().then(function() {
      var indexView = new IndexView({
        collection: self.collection
      });

      self.container.show(indexView);
    });
  },

  create: function () {
    var self = this;
    return this._getCollection().then(function() {
      var model = new Model();

      var createView = new CreateView({
        collection: self.collection,
        model: model
      });

      self.container.show(createView);
    });
  },

  show: function (id) {
    var self = this;
    return this._getModel(id).then(function(model) {
      var showView = new ShowView({
        model: model
      });

      self.container.show(showView);
    });
  },

  edit: function (id) {
    var self = this;
    return this._getModel(id).then(function(model) {
      var editView = new EditView({
        model: model
      });

      self.container.show(editView);
    });
  },

  _getCollection: function() {
    var deferred = $.Deferred();

    if (this.collection) {
      deferred.resolve(this.collection);
    } else {
      this.collection = new Collection();
      this.collection.fetch().then(deferred.resolve);
    }

    return deferred;
  },

  _getModel: function(id) {
    var self = this;
    return this._getCollection().then(function() {
      return self.collection.get(id);
    });
  }
});
