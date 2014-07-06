var Router = require('../classes/router');

module.exports = Router.extend({
  title: 'Colors',
  rootPath: 'colors',

  appRoutes: {
    'colors'          : 'index',
    'colors/new'      : 'create',
    'colors/:id'      : 'show',
    'colors/:id/edit' : 'edit'
  }
});
