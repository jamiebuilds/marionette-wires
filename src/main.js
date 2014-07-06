require('./plugins');
var Backbone = require('backbone');

var Application = require('./application/controller');

window.app = new Application({
  modules: {
    index  : { controller: require('./index/controller') },
    colors : { controller: require('./colors/controller') }
  }
});

Backbone.history.start();
