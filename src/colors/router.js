var Router = require('../classes/router');

module.exports = Router.extend({
  appRoutes: {
    'colors'          : 'index',
    'colors/new'      : 'create',
    'colors/:id'      : 'show',
    'colors/:id/edit' : 'edit'
  }
});
