var $ = require('jquery');
var _ = require('underscore');
var Router = require('../classes/router');

var Model = require('./model');
var Collection = require('./collection');

var IndexView  = require('./index/composite-view');
var CreateView = require('./create/view');
var ShowView   = require('./show/view');
var EditView   = require('./edit/view');

module.exports = Router.extend({
  initialize: function(options) {
    this.container = options.container;
  },

  routes: {
    'colors'          : 'index',
    'colors/new'      : 'create',
    'colors/:id'      : 'show',
    'colors/:id/edit' : 'edit'
  },

  index: function () {
    return this._getCollection().then(_.bind(this._showIndexView, this));
  },

  create: function () {
    return this._getCollection().then(_.bind(this._showCreateView, this));
  },

  show: function (id) {
    return this._getModel(id).then(_.bind(this._showShowView, this));
  },

  edit: function (id) {
    return this._getModel(id).then(_.bind(this._showEditView, this));
  },

  _showIndexView: function() {
    var indexView = new IndexView({
      collection: this.collection
    });

    this.container.show(indexView);
  },

  _showCreateView: function() {
    var model = new Model();

    var createView = new CreateView({
      collection: this.collection,
      model: model
    });

    this.container.show(createView);
  },

  _showShowView: function(model) {
    var showView = new ShowView({
      model: model
    });

    this.container.show(showView);
  },

  _showEditView: function(model) {
    var editView = new EditView({
      model: model
    });

    this.container.show(editView);
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
