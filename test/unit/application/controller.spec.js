describe('application/controller.js', function() {
  beforeEach(function() {
    this.Router = stub();

    this.layoutView = { render: stub() };
    this.LayoutView = stub().returns(this.layoutView);

    this.ModalController = stub();
    this.IndexRouter     = stub();
    this.ColorsRouter    = stub();

    this.Controller = proxyquire('../../src/application/controller.js', {
      './router'            : this.Router,
      './layout-view'       : this.LayoutView,
      '../modal/controller' : this.ModalController,
      '../index/router'     : this.IndexRouter,
      '../colors/router'    : this.ColorsRouter
    });

    this.controller = new this.Controller();
  });

  describe('#initialize', function() {
    beforeEach(function() {
      this.router = { router: true };
      this.Router.returns(this.router);

      this.overlay = { overlay: true };
      this.layoutView.overlay = this.overlay;

      stub(Backbone.history, 'start');

      this.controller.initialize();
    });

    it('should create a layout', function() {
      expect(this.LayoutView).to.have.been.calledWithNew;
      expect(this.controller).to.have.property('layout', this.layout);
    });

    it('should create a router', function() {
      expect(this.Router).to.have.been.calledWithNew;
      expect(this.controller).to.have.property('router', this.router);
    });

    it('should create a modal controller', function() {
      expect(this.ModalController).to.have.been.calledWithNew
        .and.calledWith({ container: this.overlay });
    });

    it('should start all of the routers', function() {
      expect(this.IndexRouter).to.have.been.calledOn(this.controller);
      expect(this.ColorsRouter).to.have.been.calledOn(this.controller);
    });

    it('should start Backbone.history', function() {
      expect(Backbone.history.start).to.have.been.calledOnce;
    });
  });
});
