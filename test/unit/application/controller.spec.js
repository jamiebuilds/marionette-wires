describe('application/controller.js', function() {
  beforeEach(function() {
    this.routerStub = this.sinon.stub();
    this.layoutViewInstance = { render: this.sinon.stub() };
    this.layoutViewStub = this.sinon.stub().returns(this.layoutViewInstance);

    this.modalControllerStub = this.sinon.stub();
    this.indexRouterStub     = this.sinon.stub();
    this.colorsRouterStub    = this.sinon.stub();

    this.Controller = proxyquire('../../src/application/controller.js', {
      './router'            : this.routerStub,
      './layout-view'       : this.layoutViewStub,
      '../modal/controller' : this.modalControllerStub,
      '../index/router'     : this.indexRouterStub,
      '../colors/router'    : this.colorsRouterStub
    });

    this.controller = new this.Controller();
  });

  describe('#initialize', function() {
    beforeEach(function() {
      this.routerInstance = { router: true };
      this.routerStub.returns(this.routerInstance);

      this.overlayInstance = { overlay: true };
      this.layoutViewInstance.overlay = this.overlayInstance;

      this.historyStartStub = this.sinon.stub(this.Backbone.history, 'start');

      this.controller.initialize();
    });

    it('should create a layout', function() {
      expect(this.layoutViewStub).to.have.been.calledWithNew;
      expect(this.controller).to.have.property('layout', this.layoutInstance);
    });

    it('should create a router', function() {
      expect(this.routerStub).to.have.been.calledWithNew;
      expect(this.controller).to.have.property('router', this.routerInstance);
    });

    it('should create a modal controller', function() {
      expect(this.modalControllerStub).to.have.been.calledWithNew
        .and.calledWith({ container: this.overlayInstance });
    });

    it('should start all of the routers', function() {
      expect(this.indexRouterStub).to.have.been.calledOn(this.controller);
      expect(this.colorsRouterStub).to.have.been.calledOn(this.controller);
    });

    it('should start Backbone.history', function() {
      expect(this.historyStartStub).to.have.been.calledOnce;
    });
  });
});
