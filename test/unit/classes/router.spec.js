describe('classes/router.js', function() {
  beforeEach(function() {
    spy(Marionette, 'AppRouter');
    this.channel = { vent: { trigger: stub() } };

    this.Router = proxyquire('../../src/classes/router', {
      './radio': { channel: stub().returns(this.channel) }
    });
  });

  describe('#constructor', function() {
    it('should delegate to Marionette.AppRouter#constructor', function() {
      this.router = new this.Router();
      expect(Marionette.AppRouter).to.have.been.called;
    });

    describe('when addToHeader is true', function() {
      beforeEach(function() {
        this.FooRouter = this.Router.extend({
          title: 'Foo',
          rootPath: 'foo'
        });

        this.fooRouter = new this.FooRouter();
      });

      it('should add the subrouter to the header', function() {
        expect(this.channel.vent.trigger)
          .to.have.been.calledWith('add', this.fooRouter.title, this.fooRouter.rootPath);
      });
    });

    describe('when addToHeader is false', function() {
      beforeEach(function() {
        this.FooRouter = this.Router.extend({
          title: 'Foo',
          rootPath: 'foo',
          addToHeader: false
        });

        this.fooRouter = new this.FooRouter();
      });

      it('should not add the subrouter to the header', function() {
        expect(this.channel.vent.trigger).not.to.have.been.called;
      });
    });
  });
});
