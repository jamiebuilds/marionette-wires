var Controller = require('./controller');

module.exports = function () {
  var controller = new Controller({
    container: this.layout.content
  });
  this.router.processAppRoutes(controller, {
    '' : 'index'
  });
};
