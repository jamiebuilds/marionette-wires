var _ = require('underscore');
var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;
var Marionette = require('backbone.marionette');

before(function() {
  this._ = _;
  this.Backbone = Backbone;
  this.Marionette = Marionette;
});

beforeEach(function() {
  this.sinon = sinon.sandbox.create();
});

afterEach(function() {
  this.sinon.restore();
  this.Backbone.history.stop();
});
