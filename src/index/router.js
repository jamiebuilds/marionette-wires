var Router = require('../classes/router');

module.exports = Router.extend({
  title: 'Index',
  rootPath: '',
  addToHeader: false,

  appRoutes: {
    '': 'index'
  }
});
