describe('application/router.js', function () {
  beforeEach(function() {
    this.Router = proxyquire('../../src/application/router.js', {});
    this.router = new this.Router();
  });

  describe('#onRoute', function() {
    beforeEach(function() {
      this.channel = Backbone.Wreqr.radio.channel('application');
      stub(this.channel.vent, 'trigger');
      this.router.onRoute('routeName', 'routePath', 'routeRegex', 'routeArgs');
    });

    it('should trigger a route event on the application channel', function() {
      expect(this.channel.vent.trigger).to.have.been.calledWith(
        'route', 'routeName', 'routePath', 'routeRegex', 'routeArgs'
      );
    });
  });
});
