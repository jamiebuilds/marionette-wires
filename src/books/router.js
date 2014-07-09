var Router = require('../classes/router');

module.exports = Router.extend({
  title: 'Books',
  rootPath: 'books',

  appRoutes: {
    'books'     : 'index',
    'books/:id' : 'show'
  }
});
