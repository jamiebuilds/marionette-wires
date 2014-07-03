describe('application/router.js', function () {
  beforeEach(function() {
    this.Router = proxyquire('../../src/application/router.js', {});
    this.router = new this.Router();
  });

  describe('#onRoute', function() {
    beforeEach(function() {
      this.applicationChannel = this.Backbone.Wreqr.radio.channel('application');
      this.triggerStub = this.sinon.stub(this.applicationChannel.vent, 'trigger');
      this.routeArgs = ['routeName', 'routePath', 'routeRegex', 'routeArgs'];
      this.triggerArgs = ['route'].concat(this.routeArgs);
      this.router.onRoute.apply(this.router, this.routeArgs);
    });

    it('should trigger a route event on the application channel', function() {
      expect(this.triggerStub.lastCall.args).to.deep.equal(this.triggerArgs);
    });
  });
});
