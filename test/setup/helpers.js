var _ = require('lodash');
var Backbone = require('backbone');
Backbone.$ = $;
var Marionette = require('backbone.marionette');

before(function() {
  global._ = _;
  global.Backbone = Backbone;
  global.Marionette = Marionette;
});

beforeEach(function() {
  this.sinon = sinon.sandbox.create();
  global.stub = this.sinon.stub.bind(this.sinon);
  global.spy  = this.sinon.spy.bind(this.sinon);
});

afterEach(function() {
  this.sinon.restore();
  Backbone.history.stop();
});
