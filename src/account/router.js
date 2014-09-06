var Router = require('src/common/router');

var LoginRoute  = require('./login/route');
var ForgotRoute = require('./forgot/route');
var ResetRoute  = require('./reset/route');
var ShowRoute   = require('./show/route');
var CreateRoute = require('./create/route');

module.exports = Router.extend({
  initialize: function(options) {
    this.container = options.container;
  },

  routes: {
    'login'        : 'login',
    'login/forgot' : 'forgot',
    'login/reset'  : 'reset',
    'account'      : 'show',
    'account/new'  : 'create'
  },

  login: function() {
    return new LoginRoute({
      container: this.container
    });
  },

  forgot: function() {
    return new ForgotRoute({
      container: this.container
    });
  },

  reset: function() {
    return new ResetRoute({
      container: this.container
    });
  },

  show: function() {
    return new ShowRoute({
      container: this.container
    });
  },

  create: function() {
    return new CreateRoute({
      container: this.container
    });
  }
});
