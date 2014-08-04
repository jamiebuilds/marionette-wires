var Router = require('../classes/router');

module.exports = Router.extend({
  appRoutes: {
    'books'     : 'index',
    'books/:id' : 'show'
  }
});
