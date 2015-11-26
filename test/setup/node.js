if (!global.document || !global.window) {
  require('babel-register');

  var jsdom = require('jsdom').jsdom;

  global.document = jsdom('<html><head><script></script></head><body></body></html>', {
    FetchExternalResources   : ['script'],
    ProcessExternalResources : ['script'],
    MutationEvents           : '2.0',
    QuerySelector            : false
  });

  global.window = document.defaultView;
  global.navigator = global.window.navigator;
  global.location = global.window.location;
}

global.$ = global.jQuery = require('jquery/dist/jquery')(global.window);

var proxyquire = require('proxyquire').noCallThru();
var sinon = require('sinon');
var chai = require('chai');
var sinonChai = require('sinon-chai');

chai.use(sinonChai);

global.sinon = sinon;
global.expect = chai.expect;
global.proxyquire = proxyquire;
