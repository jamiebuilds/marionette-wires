var Controller = require('./controller');

module.exports = function () {
  var controller = new Controller({
    container : this.layout.content
  });

  this.router.processAppRoutes(controller, {
    'colors'          : 'index',
    'colors/new'      : 'create',
    'colors/:id'      : 'show',
    'colors/:id/edit' : 'edit'
  });
};
