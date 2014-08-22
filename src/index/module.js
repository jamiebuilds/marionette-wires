var Module = require('src/common/module');
var Router = require('./router');


module.exports = Module.extend({
  initialize: function() {
    this.router = new Router(this.options);
  }
});
